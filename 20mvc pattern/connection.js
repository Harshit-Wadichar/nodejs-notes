const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function connectMongoDb(url) {
    return mongoose.connect(url); // Removed commented-out return
}

module.exports = { connectMongoDb };
