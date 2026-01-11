import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [editDriver, setEditDriver] = useState(null);
  const [deleteDriver, setDeleteDriver] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 Fetch drivers
  const fetchDrivers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/driver/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDrivers(res.data);
      setFilteredDrivers(res.data);
    } catch {
      setMessage("❌ Failed to fetch drivers");
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // 🔍 Search
  useEffect(() => {
    const result = drivers.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.contact.includes(search)
    );
    setFilteredDrivers(result);
  }, [search, drivers]);

  // ✏️ Update
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/driver/update/${editDriver._id}`,
        editDriver,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Driver updated");
      setEditDriver(null);
      fetchDrivers();
    } catch {
      setMessage("❌ Update failed");
    }
  };

  // 🗑 DELETE
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/driver/delete/${deleteDriver._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("🗑 Driver deleted");
      setDeleteDriver(null);
      fetchDrivers();
    } catch {
      setMessage("❌ Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-6"
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
            🚍 Driver Management
          </h2>

          <div className="flex gap-3 w-full md:w-auto">
            <input
              placeholder="Search name / contact"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full md:w-64"
            />
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              ⬅ Dashboard
            </button>
          </div>
        </div>

        {message && <p className="text-center mb-4">{message}</p>}

        {/* 📱 MOBILE */}
        <div className="md:hidden space-y-4">
          {filteredDrivers.map((d) => (
            <motion.div
              key={d._id}
              className="bg-white p-4 rounded-xl shadow border"
            >
              <p><b>Name:</b> {d.name}</p>
              <p><b>Contact:</b> {d.contact}</p>
              <p><b>License:</b> {d.licenseNumber}</p>
              <p><b>Address:</b> {d.address}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setEditDriver(d)}
                  className="flex-1 bg-yellow-400 py-2 rounded"
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => setDeleteDriver(d)}
                  className="flex-1 bg-red-500 text-white py-2 rounded"
                >
                  🗑 Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🖥 DESKTOP */}
        <div className="hidden md:block overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">License</th>
                <th className="p-3">Address</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((d) => (
                <tr key={d._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{d.name}</td>
                  <td className="p-3">{d.contact}</td>
                  <td className="p-3">{d.licenseNumber}</td>
                  <td className="p-3">{d.address}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => setEditDriver(d)}
                      className="bg-yellow-400 px-3 py-1 rounded"
                    >
                      ✏
                    </button>
                    <button
                      onClick={() => setDeleteDriver(d)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ❌ DELETE CONFIRM */}
      <AnimatePresence>
        {deleteDriver && (
          <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <motion.div className="bg-white p-6 rounded-xl max-w-sm w-full">
              <h3 className="text-lg font-bold text-center">
                Delete {deleteDriver.name}?
              </h3>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteDriver(null)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DriverList;
