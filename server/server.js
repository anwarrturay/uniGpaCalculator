const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const gpaRoutes = require("./routes/gpaRoutes.js");
const register = require("./routes/register.js");
const auth = require("./routes/auth.js")
const connectDB = require("./config/dbConn.js");
const corsOptions = require('./config/corsOptions.js');
const credentials = require("./middleware/credentials.js")
require('dotenv').config();
const app = express();


connectDB();

app.use(credentials);

const PORT = process.env.PORT || 5000;


app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }))

app.use("/uploads", express.static("uploads"));
app.use('/users', require('./routes/users'));
app.use('/api/gpa', gpaRoutes);
app.use('/register', register);
app.use('/auth', auth);

// Start the server
mongoose.connection.once('open', ()=>{
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  console.log("Connected To MongoDB");
})
