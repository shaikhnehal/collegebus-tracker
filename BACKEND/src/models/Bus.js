const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    route: { type: String, required: true },

    // 🔹 Driver reference
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },

    // 🔹 Backup name (easy access)
    driverName: {
      type: String,
      default: "Not Assigned",
    },

    location: {
      lat: { type: Number, default: 23.2599 }, // Bhopal
      lng: { type: Number, default: 77.4126 },
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bus", busSchema);
