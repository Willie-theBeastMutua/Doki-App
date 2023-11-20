// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import the cors module


const app = express();
const port = 3000;

// Configure middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'doki',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Create users table
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR(255) NOT NULL,
    lName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  }
});

// Handle sign-up requests
app.post('/signup', async (req, res) => {
  const { fName, lName, email, password } = req.body;
  console.log(req.body);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  db.query(
    'INSERT INTO users (fName, lName, email, password) VALUES (?, ?, ?, ?)',
    [fName, lName, email, hashedPassword],
    // console.log(res),
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'User created successfully' });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
