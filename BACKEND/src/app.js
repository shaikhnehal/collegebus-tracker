
// const express = require("express");
// const cors = require("cors");
// const moveBusRandomly = require("./utils/liveTracker");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ROUTES
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/buses", require("./routes/bus.routes"));
// app.use("/api/driver", require("./routes/driver.routes"));

// // LIVE TRACKER
// setInterval(moveBusRandomly, 2000);

// app.get("/", (req, res) => {
//   res.send("🚍 CollegeBus Backend Running");
// });

// module.exports = app;

const express = require("express");
const cors = require("cors");
const moveBusRandomly = require("./utils/liveTracker");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors()); // 🔥 VERY IMPORTANT

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

