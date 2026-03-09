// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ================= APP INIT =================
const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors());

// ================= MONGODB CONNECTION =================
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/disasterDB";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
}

connectDB();

// ================= ROUTES IMPORT =================
const userRoutes = require("./routes/user");
const environmentRoutes = require("./routes/environment");
const alertRoutes = require("./routes/alertRoutes");
const sosRoutes = require("./routes/sos");
const shelterRoutes = require("./routes/shelter");
const overviewRoutes = require("./routes/overviewRoutes");
const analyticsRoutes = require("./routes/analytics");
const sensorRoutes = require("./routes/sensorRoutes");
const trendsRoutes = require("./routes/trendsRoutes");
const analyticsRoute = require("./routes/adminAnalytics");
const aiRoutes = require("./routes/aiRoutes");



// ================= ROUTES USE =================
app.use("/api/users", userRoutes);
app.use("/api/sensors", sensorRoutes); // only once
app.use("/api/environment", environmentRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/shelters", shelterRoutes);
app.use("/api/overview", overviewRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/trends", trendsRoutes);
app.use("/api/admin/analytics", analyticsRoute);
app.use("/api/ai", aiRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("🚀 Disaster Prediction API is running...");
});

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});