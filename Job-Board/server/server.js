const dotenv = require("dotenv");

// Load environment variables before importing routes/controllers
dotenv.config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const companyRoutes = require("./routes/companyRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");

const app = express();

// Connect MongoDB
connectDB();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Job Board API is running.",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/saved-jobs", savedJobRoutes);

// Unknown route handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Multer/file-upload error handler
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Resume size must not exceed 5 MB.",
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message || "File upload failed.",
    });
  }

  if (
    error.message ===
    "Only PDF, DOC, and DOCX resume files are allowed."
  ) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next(error);
});

// General error handler
app.use((error, req, res, next) => {
  console.error("Server error:", error);

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error.",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});