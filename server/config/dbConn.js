import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config();
// MySQL connection
const dbConn = mysql2.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'uniGpa_db', // Replace with your database name
    port: 3306, // Explicitly specify the port
});
  
<<<<<<< HEAD
  // Connect to MySQL database
    dbConn.connect((err) => {
=======
// Connect to MySQL database
dbConn.connect((err) => {
>>>>>>> 6757b83e68a4cc68e544ff83dcfdf5473e633d77
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL database on port 3306');
    }
});


export default dbConn;