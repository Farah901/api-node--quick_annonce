const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Import routes
const articleRoutes = require("./routes/articles"); // Adjust the path if necessary

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for frontend requests

// Routes
app.use("/api", articleRoutes); // This mounts the router correctly

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
