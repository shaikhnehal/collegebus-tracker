import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AssignDriver = () => {
  const [buses, setBuses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [busId, setBusId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const busRes = await axios.get(
        "http://localhost:5000/api/buses",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const driverRes = await axios.get(
        "http://localhost:5000/api/driver/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBuses(busRes.data);
      setDrivers(driverRes.data);
    } catch (err) {
      setMessage("❌ Failed to load buses or drivers");
    }
  };

  const handleAssign = async () => {
    if (!busId || !driverId) {
      return setMessage("⚠ Please select both Bus and Driver");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/buses/assign-driver",
        { busId, driverId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Driver assigned successfully");
      setBusId("");
      setDriverId("");
    } catch {
      setMessage("❌ Assignment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
            🚌 Assign Driver
          </h2>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            ⬅ Dashboard
          </button>
        </div>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4 font-medium"
          >
            {message}
          </motion.p>
        )}

        {/* FORM */}
        <div className="space-y-5">
          {/* BUS SELECT */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Select Bus
            </label>
            <select
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Bus --</option>
              {buses.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.number} ({b.route})
                </option>
              ))}
            </select>
          </div>

          {/* DRIVER SELECT */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Select Driver
            </label>
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Driver --</option>
              {drivers.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name} ({d.contact})
                </option>
              ))}
            </select>
          </div>

          {/* ASSIGN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAssign}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            🔗 Assign Driver
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssignDriver;
