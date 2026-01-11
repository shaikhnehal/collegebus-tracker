const express = require("express");
const router = express.Router();

const busController = require("../controllers/bus.controller");
const { protect } = require("../middleware/auth.middleware");
const { adminOnly } = require("../middleware/admin.middleware");

// 👤 USER → View buses on map
router.get("/", protect, busController.getAllBuses);

// 👑 ADMIN
router.post("/add", protect, adminOnly, busController.addBus);
router.put("/:id/location", protect, adminOnly, busController.updateLocation);
router.post(
  "/assign-driver",
  protect,
  adminOnly,
  busController.assignDriverToBus
);

module.exports = router;
