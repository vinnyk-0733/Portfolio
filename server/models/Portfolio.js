import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    password: { type: String, default: 'vinayakumar073' },
    studentDetails: {
        name: String,
        location: String,
        email: String,
        phone: String,
        github: String,
        profileImage: String,
    },
    typingTexts: [String],
    summary: String,
    academics: [{
        id: String,
        degree: String,
        institute: String,
        graduationDate: String,
    }],
    skills: {
        technical: [String],
        interests: [String],
        soft: [String],
    },
    certifications: [{
        id: String,
        name: String,
        issuer: String,
        link: String,
        credentialId: String,
        badge: String,
    }],
    internshipProjects: [{
        id: String,
        title: String,
        category: String,
        description: String,
        liveDemo: String,
        repository: String,
    }],
    personalProjects: [{
        id: String,
        title: String,
        category: String,
        description: String,
        liveDemo: String,
        repository: String,
    }],
    internships: [{
        id: String,
        company: String,
        role: String,
        duration: String,
        bullets: [String],
    }],
}, { timestamps: true });

export default mongoose.model('Portfolio', PortfolioSchema);
