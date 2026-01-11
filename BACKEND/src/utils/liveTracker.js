const Bus = require("../models/Bus");

// 🔁 Random movement simulator
const moveBusRandomly = async () => {
  const buses = await Bus.find();

  for (let bus of buses) {
    if (!bus.location) continue;

    // 🧮 Slight random movement
    bus.location.lat += (Math.random() - 0.5) * 0.001;
    bus.location.lng += (Math.random() - 0.5) * 0.001;

    await bus.save();

    // 🔥 Emit updated location
    global.io.emit("busLocationUpdate", bus);
  }
};

module.exports = moveBusRandomly;
