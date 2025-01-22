import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
// import './config/dbConn';

const PORT = 5000 || process.env.PORT;
dotenv.config();
app.use(bodyParser());
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/gpa', gpaRoutes);

// API route for login
app.post('/', (req, res) => {
  const { idNumber, password } = req.body;
  const query = 'SELECT * FROM login WHERE email = ? AND password = ?';
  db.query(query, [idNumber, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).send({ message: 'Internal server error' });
    } else if (results.length > 0) {
      res.send({ message: 'Login successful', user: results[0] });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  });
});

// API route for signup
app.post('/signup', (req, res) => {
  const { firstname, lastname, email, idNumber, password, department, year } = req.body;

  if (!firstname || !lastname || !email || idNumber || !password || !department || !year) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO signup (firstname, lastname, email, idNumber, password, department, year) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [firstname, lastname, email, idNumber, password, department, year], (err, results) => {
    if (err) {
      console.error('Error during signup:', err);
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.send({ message: 'Signup successful' });
    }
  });
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
