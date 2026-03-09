// models/AdminSettings.js
const mongoose = require("mongoose");

const AdminSettingsSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  theme: String,
  notifications: Boolean,
  sidebarCollapsed: Boolean,
  defaultCity: String,
  emailAlerts: Boolean,
  smsAlerts: Boolean,
  severityLevel: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminSettings", AdminSettingsSchema);