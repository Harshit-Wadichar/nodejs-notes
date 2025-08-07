const express = require('express');
const path = require("path");
const app = express();
const { connectToMongoDb } = require('./connection');
const urlRoute = require('./routes/url');
const staticRoutes = require('./routes/staticrouter');
const URL = require('./model/url');
const PORT = 8001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Database connection
connectToMongoDb('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Connection error:', err));

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.get('/test', (req, res)=>{
    return res.render('home');
})

// Routes
app.use("/url", urlRoute);

app.use('/', staticRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});