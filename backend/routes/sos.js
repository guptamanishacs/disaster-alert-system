const express = require("express");
const router = express.Router();
const SOS = require("../models/SOS");

// ✅ CREATE SOS
router.post("/", async (req, res) => {
  try {
    const sos = new SOS(req.body);
    await sos.save();
    res.json(sos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET ALL SOS
router.get("/", async (req, res) => {
  try {
    const sosList = await SOS.find().sort({ createdAt: -1 });
    res.json(sosList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE STATUS
router.put("/:id", async (req, res) => {
  try {
    const updated = await SOS.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;