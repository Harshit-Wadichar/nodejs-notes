const mongoose = require('mongoose');

async function connectToMongoDb(URL){
    return mongoose.connect(URL);
}

module.exports = {
    connectToMongoDb,
};