const express = require('express');

const app = express();
const PORT = 8000;

app.get('/', (req, res)=>{
    return res.json({
        message:  `Hello from express Server! ${process.pid}`
    });
})

app.listen(PORT, ()=>{ return console.log("server started") });