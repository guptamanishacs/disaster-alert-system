const mongoose = require("mongoose");

const AiPredictionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  location: { type: String, required: true },
  probability: { type: Number, required: true },
  confidence: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("AiPrediction", AiPredictionSchema);