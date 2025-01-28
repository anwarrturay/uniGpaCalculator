import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gpaRoutes from "./routes/gpaRoutes.js";
import dbConn from './config/dbConn.js';
// import bcrypt from 'bcrypt';
const app = express();
dotenv.config();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['POST', 'GET', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }))
app.use('/api/gpa', gpaRoutes);

// API route for login
app.post('/', (req, res) => {
  const { id_number, password } = req.body;
  const query = 'SELECT * FROM registration WHERE id_number = ? AND password = ?';
  dbConn.query(query, [id_number, password], (err, results) => {
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
app.post('/register', async (req, res) => {
  const { first_name, last_name, email, id_number, password, department, level, image } = req.body;

  try{

    const encryptedPassword = await bcrypt.hash(password, 10);

    // Validate all required fields
    if (!first_name || !last_name || !email || !id_number || !password || !department || !level || !image) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const query = `INSERT INTO registration (first_name, last_name, email, id_number, password, department, level, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    dbConn.query(query, [first_name, last_name, email, id_number, encryptedPassword, department, level, image], (err, results) => {
      if (err) {
        console.error('Error during signup:', err);
        res.status(500).send({ message: 'Internal server error' });
      } else {
        res.status(201).send({ message: `A user with name: ${first_name} ${last_name} has registered` });
      }
    });
  }catch(err){
    console.error(err);
    res.status(500).json({message: "Server error"})
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
