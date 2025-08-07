require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const Blog = require('./models/blog');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL).then(e => console.log('mongodb connected'))

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))

// Middleware to parse URL-encoded data
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("public")));

app.get('/', async (req, res)=>{
    const allBlogs = await Blog.find({});
    return res.render('home',{
        user: req.user,
        blogs: allBlogs,
    });
})

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, ()=>{ return console.log(`server started at port:${PORT}`)})
