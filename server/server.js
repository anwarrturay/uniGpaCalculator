require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const path = require("path");

const connectDB = require("./config/dbConn.js");
const corsOptions = require('./config/corsOptions.js');
const credentials = require("./middleware/credentials.js");

// Import Routes
const gpaRoutes = require("./routes/gpaRoutes.js");
const registerRoutes = require("./routes/register.js");
const authRoutes = require("./routes/auth.js");
const getImageRoute = require("./routes/getImageRoute.js");
const userRoutes = require("./routes/users.js");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

// API Routes
app.use('/user-image', getImageRoute);
app.use('/users', userRoutes);
app.use('/api/gpa', gpaRoutes);
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);

// MongoDB Connection & Server Start
mongoose.connection.once('open', () => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});

// Handle MongoDB Connection Errors
mongoose.connection.on('error', (err) => {
  console.error("❌ MongoDB connection error:", err);
});
