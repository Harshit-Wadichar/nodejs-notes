const express = require('express');

const app = express();

app.get('/', (req ,res)=>{
    res.send('welcome ' + req.query.name + ',to home page');
    
})

app.all('/about', (req ,res)=>{
    res.send('about page');
})

app.listen(8000, ()=>{
    console.log('server is running on port 8000');
});