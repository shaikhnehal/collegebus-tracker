// const express = require("express");
// const router = express.Router();
// const { updateMyLocation } = require("../controllers/driver.controller");
// const { protect } = require("../middleware/auth.middleware");

// router.put("/location", protect, updateMyLocation);

// module.exports = router;



const express = require("express");
const router = express.Router();

const driverController = require("../controllers/driver.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

// ✅ ADD DRIVER
router.post("/add", protect, adminOnly, driverController.addDriver);

// ✅ GET ALL DRIVERS
router.get("/all", protect, adminOnly, driverController.getAllDrivers);

// ✅ UPDATE DRIVER
router.put("/update/:id", protect, adminOnly, driverController.updateDriver);

// ✅ DELETE DRIVER  🔥🔥🔥 (YE MISS THA)
router.delete("/delete/:id", protect, adminOnly, driverController.deleteDriver);

module.exports = router;
