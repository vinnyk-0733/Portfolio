import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dateVisited: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Visitor', VisitorSchema);
