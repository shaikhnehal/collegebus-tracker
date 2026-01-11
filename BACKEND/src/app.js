// const express = require("express");
// const cors = require("cors");
// const moveBusRandomly = require("./utils/liveTracker");
// const busRoutes = require("./routes/bus.routes");


const express = require("express");
const cors = require("cors");
const moveBusRandomly = require("./utils/liveTracker");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/buses", require("./routes/bus.routes"));
app.use("/api/driver", require("./routes/driver.routes"));

// LIVE TRACKER
setInterval(moveBusRandomly, 2000);

app.get("/", (req, res) => {
  res.send("🚍 CollegeBus Backend Running");
});

module.exports = app;

