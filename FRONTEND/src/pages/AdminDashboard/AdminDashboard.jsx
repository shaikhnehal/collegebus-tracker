import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AdminSidebar from "./AdminSidebar";
import CardGrid from "./CardGrid";
import LiveMap from "./LiveMap";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // responsive
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header isMobile={isMobile} setSidebarOpen={setSidebarOpen} />

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
        handleLogout={handleLogout}
        scrollToSection={scrollToSection}
      />

      <main className="pt-20 px-4 md:ml-64">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4"
        >
          Welcome Admin 👋
        </motion.h1>

        <CardGrid />

        <div id="live-map" className="mt-10">
          <LiveMap />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
