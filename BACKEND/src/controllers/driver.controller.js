
// const Driver = require("../models/Driver");

// // ➕ Add Driver (ADMIN)
// exports.addDriver = async (req, res) => {
//   try {
//     const { name, contact, email, licenseNumber, address } = req.body;

//     if (!name || !contact || !licenseNumber || !address) {
//       return res.status(400).json({ message: "All required fields missing" });
//     }

//     const exists = await Driver.findOne({ licenseNumber });
//     if (exists) {
//       return res.status(400).json({ message: "Driver already exists" });
//     }

//     const driver = await Driver.create({
//       name,
//       contact,
//       email,
//       licenseNumber,
//       address,
//     });

//     res.status(201).json(driver);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 📥 Get All Drivers (ADMIN)
// exports.getAllDrivers = async (req, res) => {
//   try {
//     const drivers = await Driver.find().sort({ createdAt: -1 });
//     res.json(drivers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✏️ Update Driver
// exports.updateDriver = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const updated = await Driver.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const Driver = require("../models/Driver");

// // ➕ ADD DRIVER (ADMIN ONLY)
// exports.addDriver = async (req, res) => {
//   try {
//     const { name, contact, email, licenseNumber, address } = req.body;

//     if (!name || !contact || !licenseNumber || !address) {
//       return res.status(400).json({ message: "All required fields missing" });
//     }

//     const exists = await Driver.findOne({ licenseNumber });
//     if (exists) {
//       return res.status(400).json({ message: "Driver already exists" });
//     }

//     const driver = await Driver.create({
//       name,
//       contact,
//       email,
//       licenseNumber,
//       address,
//     });

//     res.status(201).json(driver);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// 2second 

// // src/controllers/driver.controller.js
// const Driver = require("../models/Driver");

// // ➕ ADD DRIVER
// exports.addDriver = async (req, res) => {
//   try {
//     const { name, contact, email, licenseNumber, address } = req.body;

//     if (!name || !contact || !licenseNumber || !address) {
//       return res.status(400).json({
//         message: "All required fields missing",
//       });
//     }

//     const exists = await Driver.findOne({ licenseNumber });
//     if (exists) {
//       return res.status(400).json({
//         message: "Driver already exists",
//       });
//     }

//     const driver = await Driver.create({
//       name,
//       contact,
//       email,
//       licenseNumber,
//       address,
//     });

//     res.status(201).json(driver);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 📥 GET ALL DRIVERS
// exports.getDrivers = async (req, res) => {
//   try {
//     const drivers = await Driver.find().sort({ createdAt: -1 });
//     res.json(drivers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// 3third edit

const { model } = require("mongoose");
const Driver = require("../models/Driver");

// ============================
// ➕ ADD DRIVER
// ============================
const addDriver = async (req, res) => {
  try {
    const { name, contact, licenseNumber, address } = req.body;

    if (!name || !contact || !licenseNumber || !address) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Driver.findOne({ contact });
    if (exists) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    const driver = await Driver.create({
      name,
      contact,
      licenseNumber,
      address,
    });

    res.status(201).json({
      message: "Driver added successfully",
      driver,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================
// 📥 GET ALL DRIVERS
// ============================
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });
    res.status(200).json(drivers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch drivers" });
  }
};

// ============================
// ✏️ UPDATE DRIVER
// ============================
const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Driver.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({
      message: "Driver updated successfully",
      driver: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================
// 🗑 DELETE DRIVER ✅ (THIS WAS MISSING)
// ============================
const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Driver.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({
      message: "Driver deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addDriver,
  getAllDrivers,
  updateDriver,
  deleteDriver,
};
