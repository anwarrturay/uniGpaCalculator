require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/dbConn.js");
const corsOptions = require('./config/corsOptions.js');
const credentials = require("./middleware/credentials.js");
const verifyJWT = require("./middleware/verifyJWT.js");
const {logger} = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");

// Import Routes
const gpaRoutes = require("./routes/gpaRoutes.js");
const registerRoutes = require("./routes/register.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const adminRoutes = require("./routes/admin.js");
const refreshRoute = require("./routes/refresh.js");
const logoutRoute = require("./routes/logout.js");
const forgotPassword = require("./routes/forgotPassword.js");
// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(credentials);
app.use(cors(corsOptions));

app.use(logger);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'frontend/build')))


app.use('/uploads', express.static('uploads'));

app.use(cookieParser());

// public Routes.
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/refresh', refreshRoute);
app.use("/logout", logoutRoute);
app.use('/forgot-password', forgotPassword);

app.use(verifyJWT);

// Protected Routes
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, "..", "frontend/build", "index.html"))
})

app.use(errorHandler);

// MongoDB Connection & Server Start
mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

// Handle MongoDB Connection Errors
mongoose.connection.on('error', (err) => {
  console.error("MongoDB connection error:", err);
});
