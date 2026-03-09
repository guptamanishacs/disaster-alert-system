const express = require("express");
const router = express.Router();

const Sensor = require("../models/Sensor");
const Alert = require("../models/Alert");
const SOS = require("../models/SOS");

router.get("/", async (req, res) => {
  try {

    const totalSensors = await Sensor.countDocuments();
    const onlineSensors = await Sensor.countDocuments({ status: "Online" });
    const offlineSensors = await Sensor.countDocuments({ status: "Offline" });

    const totalAlerts = await Alert.countDocuments();
    const activeAlerts = await Alert.countDocuments({ status: "Active" });
    const resolvedAlerts = await Alert.countDocuments({ status: "Resolved" });

    const totalSOS = await SOS.countDocuments();
    const pendingSOS = await SOS.countDocuments({ status: "Pending" });
    const resolvedSOS = await SOS.countDocuments({ status: "Resolved" });

    const analytics = {
      sensors: {
        total: totalSensors,
        online: onlineSensors,
        offline: offlineSensors
      },

      alerts: {
        total: totalAlerts,
        active: activeAlerts,
        resolved: resolvedAlerts
      },

      sos: {
        total: totalSOS,
        pending: pendingSOS,
        resolved: resolvedSOS
      },

      ai: {
        accuracy: 91
      },

      disasterTrend: [
        { month: "Jan", flood: 2, aqi: 1 },
        { month: "Feb", flood: 3, aqi: 2 },
        { month: "Mar", flood: 6, aqi: 3 },
        { month: "Apr", flood: 4, aqi: 2 },
        { month: "May", flood: 7, aqi: 5 }
      ]
    };

    res.json(analytics);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;