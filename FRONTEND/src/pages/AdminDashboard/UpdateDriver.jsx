import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UpdateDriver = () => {
  const [driverName, setDriverName] = useState('John Doe');
  const [contact, setContact] = useState('9876543210');
  const [email, setEmail] = useState('john@example.com');
  const [licenseNumber, setLicenseNumber] = useState('DL1234567890');
  const [address, setAddress] = useState('123 Main Street, City');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!driverName || !contact || !licenseNumber || !address) {
      alert('Please fill in all required fields.');
      return;
    }

    alert(`✅ Driver "${driverName}" updated successfully!`);
    navigate(-1); // go back after update
  };

  const handleClear = () => {
    setDriverName('');
    setContact('');
    setEmail('');
    setLicenseNumber('');
    setAddress('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-screen h-[100dvh] bg-gray-100 flex items-center justify-center px-4 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button onClick={handleBack} className="text-blue-600 flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white p-6 sm:p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">Update Driver</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Driver Name *"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Contact Number *"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="License Number *"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Address *"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-600 text-white w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Update
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleClear}
              className="bg-gray-300 text-black w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Clear
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateDriver;
