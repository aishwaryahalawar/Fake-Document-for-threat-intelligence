// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
// Allow CORS for all domains (not recommended in production)

const sqlInjectionMiddleware = require("./middleware/sqlInjectionMiddleware");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(bodyParser.json());

// Middleware to detect SQL injection
app.use(sqlInjectionMiddleware);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all domains
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  next();
});
// Admin Routes
app.use("/admin", adminRoutes);

// User Routes
app.use("/user", userRoutes);

// Auth Routes
app.use("/auth", authRoutes);

// Server setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
