import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserEdit, FaKey, FaFileAlt, FaUpload, FaTimes, FaArrowLeft } from 'react-icons/fa';

const AdminProfile = () => {
  const [modalType, setModalType] = useState(null);

  const admin = {
    name: 'Fazle Rab',
    email: 'admin@example.com',
    phone: '+91 9876543210',
    role: 'Administrator',
    college: 'Bansal Institute of Science & Technology',
  };

  // Reusable Modal component
  const Modal = ({ title, children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={() => setModalType(null)}
          className="absolute top-3 right-4 text-xl text-gray-600 hover:text-black"
        >
          <FaTimes />
        </button>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        {children}
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex items-center justify-center p-6">
      {/* Back Arrow Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 text-white text-2xl hover:text-gray-300"
      >
        <FaArrowLeft />
      </button>

      {/* Profile Card with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Admin Profile Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">👤 Admin Profile</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="text-sm font-semibold">Name</p>
                <p className="text-lg">{admin.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Email</p>
                <p className="text-lg">{admin.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <p className="text-lg">{admin.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Role</p>
                <p className="text-lg">{admin.role}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">College</p>
                <p className="text-lg">{admin.college}</p>
              </div>
            </div>
          </div>

          {/* Right Section: Action Buttons */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Actions</h2>

            {/* Action Buttons */}
            <button onClick={() => setModalType('edit')} className="w-full flex items-center gap-3 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition">
              <FaUserEdit /> Edit Profile
            </button>
            <button onClick={() => setModalType('password')} className="w-full flex items-center gap-3 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
              <FaKey /> Change Password
            </button>
            <button onClick={() => setModalType('logs')} className="w-full flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
              <FaFileAlt /> View Logs
            </button>
            <button onClick={() => setModalType('avatar')} className="w-full flex items-center gap-3 bg-pink-600 text-white px-4 py-2 rounded-xl hover:bg-pink-700 transition">
              <FaUpload /> Upload Avatar
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal Components */}
      {modalType === 'edit' && (
        <Modal title="Edit Profile">
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
            <input type="tel" placeholder="Phone" className="w-full p-2 border rounded" />
            <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">Save Changes</button>
          </form>
        </Modal>
      )}
      {modalType === 'password' && (
        <Modal title="Change Password">
          <form className="space-y-4">
            <input type="password" placeholder="Old Password" className="w-full p-2 border rounded" />
            <input type="password" placeholder="New Password" className="w-full p-2 border rounded" />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Change Password</button>
          </form>
        </Modal>
      )}
      {modalType === 'logs' && (
        <Modal title="Activity Logs">
          <ul className="text-sm list-disc pl-5 space-y-2">
            <li>Logged in at 10:24 AM</li>
            <li>Updated schedule 11:02 AM</li>
            <li>Logged out 11:30 AM</li>
          </ul>
        </Modal>
      )}
      {modalType === 'avatar' && (
        <Modal title="Upload Profile Picture">
          <form className="space-y-4">
            <input type="file" className="w-full p-2 border rounded" />
            <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">Upload</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminProfile;
