const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const gpaRoutes = require("./routes/gpaRoutes.js");
const register = require("./routes/register.js");
const auth = require("./routes/auth.js")
const upload = require("./middleware/multerConfig.js")
const connectDB = require("./config/dbConn.js");
const corsOptions = require('./config/corsOptions.js');
require('dotenv').config;


connectDB();

const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }))

app.use('/api/gpa', gpaRoutes);
app.use('/register', upload.single("image"), register);
app.use('/auth', auth);

// Start the server
mongoose.connection.once('open', ()=>{
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  console.log("Connected To MongoDB")
})
