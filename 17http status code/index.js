const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 8000;

// Middleware to parse url-encoded data and JSON
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next)=>{
    fs.appendFile('log.txt', `${Date.now()}: ${req.method} ${req.path} \n` ,(req, res)=>{
        next();
    });
})

app.get('/users', (req, res) => {
    const html = `<li>${user.first_name}</li>`;
    res.send(html);
});

app.get('/api/users', (req, res) => {
    console.log(req.headers); //to see the request headers
    res.setHeader('X-created-by' , 'Harshit');//to set the response headers 
    // alwasys use X- before the header name for custom headers
    res.json(users);
});

app.use((req, res) => {
    res.status(404).json({ error: 'Page not found' });
});

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if(!user){
            res.status(404).json({ status: 'failed' , message: 'User not found'});
        }
        res.send(user);
    })
    .patch((req, resp) => {
        //to edit the user with id
        const id = Number(req.params.id);
        let userIndex = users.findIndex((user) => {return user.id === id});
        users[userIndex] = { ...users[userIndex], ...req.body};
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            resp.send({ status: 'successfull' });
    });
    })
    .delete((req, resp) => {
        //to delete the user with id
        const id = Number(req.params.id);
        let userIndex = users.findIndex((user) => {return user.id === id});
        users.splice(userIndex, 1);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            resp.send({ status: 'successfull' });
        });
    });

app.post('/api/users', (req, res) => {
    // Creating new user
    const body = req.body;
    if(!body.first_name || !body.last_name || !body.email || !body || !body.gender || !body.job_title ) {
        return res.status(400).json({ status: 'failed' , message: 'Please provide all the details' });
       
    }else{
    users.push({...body , id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        res.status(201).json({ status: 'successful' , id: users.length});
    });
}
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
