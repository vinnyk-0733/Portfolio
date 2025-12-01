const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        const Portfolio = require('./models/Portfolio');

        const count = await Portfolio.countDocuments();
        console.log(`Total Portfolio Documents: ${count}`);

        const portfolios = await Portfolio.find();
        portfolios.forEach((p, i) => {
            console.log(`\nDocument ${i + 1} ID: ${p._id}`);
            console.log('Skills:', JSON.stringify(p.skills, null, 2));
            console.log('UpdatedAt:', p.updatedAt);
        });

        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
