const express = require("express");
const router = express.Router();

const Sensor = require("../models/Sensor");
const Alert = require("../models/Alert");
const SOS = require("../models/SOS");

/* ---------------- ADMIN ANALYTICS ---------------- */

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

    res.json({
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
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* ---------------- USER ANALYTICS ---------------- */

router.get("/user/:userId", async (req, res) => {

  try {

    const userId = req.params.userId;

    const totalSOS = await SOS.countDocuments({ user: userId });
    const totalAlerts = await Alert.countDocuments({ user: userId });

    const pendingSOS = await SOS.countDocuments({
      user: userId,
      status: "Pending"
    });

    const resolvedSOS = await SOS.countDocuments({
      user: userId,
      status: "Resolved"
    });

    res.json({
      totalSOS,
      totalAlerts,
      pendingSOS,
      resolvedSOS
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;