const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://127.0.0.1:27017/portfolio';

console.log('Attempting to connect to:', MONGO_URI);

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('Successfully connected to MongoDB!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection failed:', err);
        process.exit(1);
    });
