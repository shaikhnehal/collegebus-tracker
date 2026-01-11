const Bus = require("../models/Bus");
const Driver = require("../models/Driver");

/* 👤 GET ALL BUSES (with driver name) */
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find()
      .populate("driver", "name mobile")
      .sort({ createdAt: -1 });

    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 👑 ADD BUS */
exports.addBus = async (req, res) => {
  try {
    const { number, route } = req.body;

    if (!number || !route) {
      return res.status(400).json({ message: "Bus number & route required" });
    }

    const exists = await Bus.findOne({ number });
    if (exists) {
      return res.status(400).json({ message: "Bus already exists" });
    }

    const bus = await Bus.create({
      number,
      route,
    });

    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 📍 UPDATE BUS LOCATION (LIVE MAP) */
exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lng } = req.body;

    const bus = await Bus.findByIdAndUpdate(
      id,
      { location: { lat, lng } },
      { new: true }
    );

    const populatedBus = await Bus.findById(bus._id).populate(
      "driver",
      "name mobile"
    );

    if (global.io) {
      global.io.emit("busLocationUpdate", populatedBus);
    }

    res.json(populatedBus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🔗 ASSIGN DRIVER → BUS */
exports.assignDriverToBus = async (req, res) => {
  try {
    const { busId, driverId } = req.body;

    if (!busId || !driverId) {
      return res.status(400).json({ message: "Bus & Driver required" });
    }

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const driver = await Driver.findById(driverId);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    bus.driver = driverId;
    bus.driverName = driver.name; // ⭐ IMPORTANT
    await bus.save();

    const populatedBus = await Bus.findById(bus._id).populate(
      "driver",
      "name mobile"
    );

    res.json({
      message: "✅ Driver assigned successfully",
      bus: populatedBus,
    });
  } catch (err) {
    res.status(500).json({ message: "Assignment failed" });
  }
};
