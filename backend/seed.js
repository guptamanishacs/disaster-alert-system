// seedSensors.js
const mongoose = require("mongoose");
require("dotenv").config();
const Sensor = require("./models/Sensor");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/disasterDB";

async function seedSensors() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected for seeding");

    // Array of all sensors to insert
    const sensors = [
      {
        sensorId: "S1",
        location: "Mumbai",
        temperature: 34,
        waterLevel: 2.82,
        aqi: 179,
        floodRisk: "Medium",
        sensorStatus: "Online",
        aiPrediction: "✅ Environment safe",
        lat: 19.0760,
        lng: 72.8777
      },
      {
        sensorId: "S2",
        location: "Pune",
        temperature: 28,
        waterLevel: 2.45,
        aqi: 72,
        floodRisk: "Medium",
        sensorStatus: "Online",
        aiPrediction: "✅ Environment safe",
        lat: 18.5204,
        lng: 73.8567
      },
      {
        sensorId: "S3",
        location: "Jaipur",
        temperature: 30,
        waterLevel: 1.2,
        aqi: 110,
        floodRisk: "Low",
        sensorStatus: "Online",
        aiPrediction: "✅ Environment safe",
        lat: 26.9124,
        lng: 75.7873
      },
      {
        sensorId: "S4",
        location: "Delhi",
        temperature: 32,
        waterLevel: 1.5,
        aqi: 190,
        floodRisk: "High",
        sensorStatus: "Online",
        aiPrediction: "⚠ Flood risk high",
        lat: 28.6139,
        lng: 77.209
      },
      {
        sensorId: "S5",
        location: "Nagpur",
        temperature: 31,
        waterLevel: 3.5,
        aqi: 80,
        floodRisk: "Low",
        sensorStatus: "Online",
        aiPrediction: "✅ Environment safe",
        lat: 21.1458,
        lng: 79.0882
      }
    ];

    // Clear old data
    await Sensor.deleteMany();
    console.log("🗑 Old sensor data cleared");

    // Insert new sensors
    const inserted = await Sensor.insertMany(sensors);
    console.log(`✅ ${inserted.length} Sensors inserted successfully`);

    mongoose.connection.close();
    console.log("✅ MongoDB connection closed");
  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
  }
}

// Run the seeding function
seedSensors();