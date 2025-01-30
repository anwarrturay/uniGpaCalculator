import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config();
// MySQL connection
const dbConn = mysql2.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '1234', // Replace with your MySQL password
    database: 'cgpa_db', // Replace with your database name
    port: 3306, // Explicitly specify the port
});

// Connect to MySQL database
dbConn.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL database on port 3306');
    }
});


export default dbConn;