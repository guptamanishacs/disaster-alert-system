const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  title: String,
  level: String,
  status: String,
  location: String,
  createdAt: { type: Date, default: Date.now }
});

// ✅ Use this pattern to avoid OverwriteModelError
module.exports = mongoose.models.Alert || mongoose.model("Alert", alertSchema);