const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const userRouter = require('./routes/user');

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(e => console.log('mongodb connected'))

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))

// Middleware to parse URL-encoded data
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    return res.render('home');
})

app.use('/user', userRouter);

app.listen(PORT, ()=>{ return console.log(`server started at port:${PORT}`)})