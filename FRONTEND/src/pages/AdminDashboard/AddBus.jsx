

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBus = () => {
  const [number, setNumber] = useState("");
  const [route, setRoute] = useState("");
  const [driverName, setDriverName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/buses/add",
        { number, route, driverName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Bus added successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to add bus");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🚌 Add New Bus
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bus Number
            </label>
            <input
              type="text"
              placeholder="MP04 AB 1234"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Route
            </label>
            <input
              type="text"
              placeholder="Route details"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Driver Name
            </label>
            <input
              type="text"
              placeholder="Ramesh Kumar"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            ➕ Add Bus
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddBus;
