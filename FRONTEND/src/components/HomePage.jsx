import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBus } from "react-icons/fa";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 overflow-hidden bg-[#0f2027] bg-[radial-gradient(at_top_left,_rgba(0,255,255,0.15),_transparent),_radial-gradient(at_bottom_right,_rgba(255,0,255,0.1),_transparent)]"
    >
      <Helmet>
        <title>College Bus Tracker | Home</title>
      </Helmet>

      {/* 💫 Starry Night Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay animate-pulse" />
      </div>

      {/* 💫 Animated Mesh Glow Sweep */}
      <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,#00ffff33,#ff00ff22,#00ffff33)] animate-[spin_20s_linear_infinite] blur-2xl opacity-10" />

      {/* 🌌 Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* 🚌 Floating Animated Bus */}
      <motion.div
        initial={{ x: "-100vw", rotate: -15, scale: 1, opacity: 1 }}
        animate={{ x: "100vw", rotate: 15, scale: 0.8, opacity: 0.6 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="absolute top-16 text-5xl sm:text-6xl opacity-90 z-20"
      >
        <FaBus className="text-yellow-300 drop-shadow-[0_0_12px_rgba(255,255,0,0.8)]" />
      </motion.div>

      {/* 🔥 Motion Trail Glow */}
      <div className="absolute top-16 left-1/3 w-28 h-10 blur-2xl bg-yellow-200/30 rounded-full opacity-30 animate-pulse z-10"></div>

      {/* 🚏 Moving Road Line */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="absolute top-24 h-0.5 w-full bg-gradient-to-r from-yellow-400 via-white to-yellow-400 opacity-40 blur-sm animate-pulse"
      />

      {/* ✨ Gradient Border Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-2xl w-full p-[3px] rounded-[2.5rem] bg-gradient-to-tr from-cyan-300/60 via-white/20 to-purple-400/50 shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,255,255,0.4)] z-10 overflow-hidden"
      >
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-cyan-300/30 to-purple-400/30 blur-xl animate-pulse z-[-1]" />

        <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/20 text-center">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-4xl sm:text-5xl font-extrabold mb-5 text-cyan-300 drop-shadow-md"
          >
            🚌 College Bus Tracker
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg sm:text-xl text-gray-200 mb-8 px-2 sm:px-0"
          >
            Track your college bus in real-time with ease. Reliable, fast!
          </motion.p>

          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-cyan-400 hover:bg-cyan-300 text-[#0f2027] font-bold px-8 py-3 rounded-full shadow-lg transition"
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>

      {/* 🌍 Footer Section */}
      <footer className="absolute bottom-0 w-full text-center text-sm text-gray-400 py-4 bg-[#0f2027]/50 backdrop-blur-sm border-t border-white/10">
        <p>© {new Date().getFullYear()} College Bus Tracker. All rights reserved.</p>
        <p>Made with  by Fazle Rab .</p>
      </footer>
    </motion.div>
  );
};

export default HomePage;
