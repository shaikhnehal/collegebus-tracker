import React from "react";
import { motion } from "framer-motion";
import {
  FaBus,
  FaMapMarkedAlt,
  FaUserAlt,
  FaCogs,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  handleLogout,
  scrollToSection,
}) => {
  const navigate = useNavigate();

  const items = [
    { label: "Dashboard", icon: <FaBus />, action: () => navigate("/admin-dashboard") },
    { label: "Profile", icon: <FaUserAlt />, action: () => navigate("/admin/profile") },
    { label: "Live Map", icon: <FaMapMarkedAlt />, action: () => scrollToSection("live-map") },
    { label: "Settings", icon: <FaCogs />, action: () => navigate("/setting-page") },
    { label: "Logout", icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <>
      {sidebarOpen && isMobile && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40"
        />
      )}

      <motion.nav
        initial={{ x: -260 }}
        animate={{ x: sidebarOpen || !isMobile ? 0 : -260 }}
        className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 z-50"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Admin Menu</h2>
          {isMobile && (
            <FaTimes
              onClick={() => setSidebarOpen(false)}
              className="cursor-pointer"
            />
          )}
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.action();
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 w-full text-left p-3 rounded hover:bg-gray-700"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default AdminSidebar;
