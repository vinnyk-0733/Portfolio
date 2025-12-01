import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Portfolio from './models/Portfolio.js';
import Visitor from './models/Visitor.js';
import defaultPortfolioData from './data/defaultData.js';
import { upload } from './cloudinaryConfig.js';

dotenv.config(); // loads .env from project root on Render

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1);
}

const EDITOR_CODE = process.env.EDITOR_CODE;

if (!EDITOR_CODE) {
    console.error('EDITOR_CODE is not defined in environment variables');
    process.exit(1);
}

app.use(cors());
app.use(express.json());

// ----- MongoDB connection -----
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

mongoose.connection.once('open', async () => {
    try {
        const count = await Portfolio.countDocuments();
        if (count === 0) {
            await Portfolio.create(defaultPortfolioData);
            console.log('Default portfolio data seeded');
        }
    } catch (err) {
        console.error('Error seeding data:', err);
    }
});

// ----- API routes -----

// Get Portfolio Data
app.get('/api/portfolio', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }
        console.log(
            'Fetched portfolio skills:',
            JSON.stringify(portfolio.skills, null, 2)
        );
        res.json(portfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Verify Password
app.post('/api/verify-password', async (req, res) => {
    const { password } = req.body;
    try {
        console.log(`Verifying password. Received: "${password}"`);

        if (password === EDITOR_CODE) {
            res.json({ success: true });
        } else {
            console.log('Password mismatch');
            res.status(401).json({ success: false, error: 'Invalid password' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update Portfolio Data
app.post('/api/portfolio/update', async (req, res) => {
    const { password, updates } = req.body;

    try {
        if (password !== EDITOR_CODE) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }

        const portfolio = await Portfolio.findOne();
        if (!portfolio) {
            return res
                .status(404)
                .json({ success: false, error: 'Portfolio not found' });
        }

        Object.keys(updates).forEach((key) => {
            if (key === 'student_details') portfolio.studentDetails = updates[key];
            else if (key === 'typing_texts') portfolio.typingTexts = updates[key];
            else if (key === 'internship_projects')
                portfolio.internshipProjects = updates[key];
            else if (key === 'personal_projects')
                portfolio.personalProjects = updates[key];
            else {
                portfolio[key] = updates[key];
            }
        });

        console.log('Received updates:', JSON.stringify(updates, null, 2));
        console.log(
            'Updated portfolio skills before save:',
            JSON.stringify(portfolio.skills, null, 2)
        );

        if (updates.skills) portfolio.markModified('skills');
        if (updates.academics) portfolio.markModified('academics');
        if (updates.certifications) portfolio.markModified('certifications');
        if (updates.internship_projects)
            portfolio.markModified('internshipProjects');
        if (updates.personal_projects)
            portfolio.markModified('personalProjects');
        if (updates.internships) portfolio.markModified('internships');
        if (updates.typing_texts) portfolio.markModified('typingTexts');

        await portfolio.save();
        res.json({ success: true, data: portfolio });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get Visitors
app.get('/api/visitors', async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ dateVisited: -1 });
        res.json(visitors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Visitor
app.post('/api/visitors', async (req, res) => {
    const { email } = req.body;
    try {
        const newVisitor = new Visitor({ email });
        await newVisitor.save();
        res.json(newVisitor);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
});

// Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ url: req.file.path });
});

// ----- Serve Vite React build -----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../dist');

app.use(express.static(clientDistPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// ----- Start server -----
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
