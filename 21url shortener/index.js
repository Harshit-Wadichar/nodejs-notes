const express = require('express');
const app = express();
const { connectToMongoDb } = require('./connection');
const urlRoute = require('./routes/url');
const URL = require('./model/url');
const PORT = 8001;

// Middleware
app.use(express.json());

// Database connection
connectToMongoDb('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Connection error:', err));

// Routes
app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});