const express = require('express');
const mysql = require('mysql2');
const app = express();

// Middleware to read form data
app.use(express.urlencoded({ extended: false }));

// Create database connection
const db = mysql.createConnection({
    host: 'localhost',      // Database server address
    user: 'root',           // Your SQL username
    password: '1234', // Your SQL password
    database: 'mydb'        // Database name
  });

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to SQL database!");
});

// Route to handle form submission
// Signup page (GET request)
app.get('/signup', (req, res) => {
    res.send(`
      <form action="/signup" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Sign Up</button>
      </form>
    `);
  });

// Handle signup (POST request)
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
  
    // 1. Check if the username already exists
    const checkSql = 'SELECT * FROM users WHERE username = ?';
    db.query(checkSql, [username], (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        res.send('Username already exists!');
      } else {
        // 2. Insert new user if username is unique
        const insertSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(insertSql, [username, password], (err) => {
          if (err) throw err;
          res.send('Signup successful!');
        });
      }
    });
  });

// Login page (GET request)
app.get('/login', (req, res) => {
    res.send(`
      <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    `);
  });

  // Handle login (POST request)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Query the database
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        res.send('Login successful!');
      } else {
        res.send('Invalid username or password.');
      }
    });
  });

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});