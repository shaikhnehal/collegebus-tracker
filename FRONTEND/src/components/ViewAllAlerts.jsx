import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// Dummy alerts data (this would be replaced with actual API data in a real application)
const dummyAlerts = [
  {
    id: 1,
    title: "Bus Delay",
    description: "The bus number 22 is delayed by 15 minutes due to traffic.",
    timestamp: "2025-04-21 08:00:00",
    status: "Warning",
  },
  {
    id: 2,
    title: "Route Change",
    description: "Bus number 17 has a temporary route change due to construction work.",
    timestamp: "2025-04-21 07:30:00",
    status: "Info",
  },
  {
    id: 3,
    title: "Accident Reported",
    description: "A minor accident has occurred on the route of bus number 10. Service is temporarily halted.",
    timestamp: "2025-04-20 18:00:00",
    status: "Critical",
  },
  // Add more alerts as necessary
];

const ViewAllAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch alerts from the API here, for now we use dummy data
    setAlerts(dummyAlerts);
  }, []);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#3b82f6] to-[#ffffff] py-12">
      {/* Back Arrow */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={handleBack}
        className="absolute top-4 left-4 text-white hover:text-[#2563eb] text-xl"
      >
        <FaArrowLeft />
      </motion.button>

      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full text-center mb-8"
      >
        <h1 className="text-4xl font-extrabold text-white">View All Alerts</h1>
        <p className="text-lg text-white mt-2">
          Stay updated with the latest bus alerts and information.
        </p>
      </motion.header>

      {/* Alerts List Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl text-center mb-8 space-y-4"
      >
        {alerts.map((alert) => (
          <div key={alert.id} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-2xl font-bold text-[#2563eb]">{alert.title}</h2>
            <p className="text-sm text-gray-500">{alert.timestamp}</p>
            <p className="text-base mt-2">{alert.description}</p>
            <p className="mt-2 text-sm font-semibold text-[#2563eb]">{alert.status}</p>
          </div>
        ))}
      </motion.section>
    </div>
  );
};

export default ViewAllAlerts;
