import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUserPlus, FaUserEdit, FaPlusSquare,
  FaWrench, FaRoute, FaChartBar
} from 'react-icons/fa';

const CardGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Driver Management */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-2xl transition col-span-1 sm:col-span-2 lg:col-span-1"
      >
        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => navigate('/add-driver')}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Driver
          </button>
          <button
            onClick={() => navigate('/assign-driver')}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Assign Driver
          </button>
        </div>
         <button
            onClick={() => navigate('/drivers-list')}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Driver List
          </button>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaUserPlus className="text-yellow-400 text-4xl" />
            <FaUserEdit className="text-yellow-400 text-4xl" />
            
          </div>
          <h3 className="text-xl font-semibold mb-2">Driver Management</h3>
          <p className="text-gray-400">Add new drivers or update driver details easily.</p>
        </div>
      </motion.div>

      <motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => navigate('/add-bus')}
  className="bg-gray-800 cursor-pointer rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-2xl transition"
>
  <FaPlusSquare className="text-yellow-400 text-4xl mb-4" />
  <h3 className="text-xl font-semibold mb-2">Add New Bus</h3>
  <p className="text-gray-400">Register new buses and assign them to routes.</p>
</motion.div>


      {/* Update Bus */}
      {/* <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/update-bus')}
        className="bg-gray-800 cursor-pointer rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-2xl transition"
      >
        <FaWrench className="text-yellow-400 text-4xl mb-4" />
        <h3 className="text-xl font-semibold mb-2">Update Bus</h3>
        <p className="text-gray-400">Edit bus details and modify route assignments.</p>
      </motion.div> */}

     
      {/* Reports & Analytics */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/reports')}
        className="bg-gray-800 cursor-pointer rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-2xl transition"
      >
        <FaChartBar className="text-yellow-400 text-4xl mb-4" />
        <h3 className="text-xl font-semibold mb-2">Reports & Analytics</h3>
        <p className="text-gray-400">View usage reports and performance analytics.</p>
      </motion.div>
    </div>
  );
};

export default CardGrid;
