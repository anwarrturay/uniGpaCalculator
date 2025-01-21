import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config();
// MySQL connection
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'signup', // Replace with your database name
    port: 3306, // Explicitly specify the port
});
  
  // Connect to MySQL database
    db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL database on port 3306');
    }
    });


export default dbConn;