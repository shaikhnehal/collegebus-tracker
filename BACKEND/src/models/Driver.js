// const mongoose = require("mongoose");

// const driverSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     contact: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       lowercase: true,
//     },
//     licenseNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["ACTIVE", "INACTIVE"],
//       default: "ACTIVE",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Driver", driverSchema);


// src/models/Driver.js
const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: String,
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
