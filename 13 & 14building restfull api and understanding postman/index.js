const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 8000;

// Middleware to parse url-encoded data and JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/users', (req, res) => {
    const html = users.map((user) => `<li>${user.first_name}</li>`).join('');
    res.send(`<ul>${html}</ul>`);
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
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
    users.push({...body , id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        res.json({ status: 'successful' , id: users.length});
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
