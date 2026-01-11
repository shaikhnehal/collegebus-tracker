import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaShareAlt,
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaArrowLeft,
} from "react-icons/fa";

const SharePage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    "Check out this amazing College Bus Tracker app!"
  );

  const shareLink = window.location.origin;

  const handleSocialShare = (platform) => {
    const text = encodeURIComponent(`${message} ${shareLink}`);
    let url = "";

    if (platform === "facebook") {
      url = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`;
    }
    if (platform === "whatsapp") {
      url = `https://wa.me/?text=${text}`;
    }
    if (platform === "instagram") {
      alert("Instagram direct web sharing supported nahi karta.");
      return;
    }

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-white p-6 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-white text-xl"
      >
        <FaArrowLeft />
      </button>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white mb-4"
      >
        Share Our App 🚍
      </motion.h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full max-w-md h-32 p-3 rounded-lg border"
      />

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => handleSocialShare("facebook")}
          className="p-3 bg-blue-700 text-white rounded-full"
        >
          <FaFacebook />
        </button>

        <button
          onClick={() => handleSocialShare("whatsapp")}
          className="p-3 bg-green-500 text-white rounded-full"
        >
          <FaWhatsapp />
        </button>

        <button
          onClick={() => handleSocialShare("instagram")}
          className="p-3 bg-pink-500 text-white rounded-full"
        >
          <FaInstagram />
        </button>

        <button className="p-3 bg-gray-700 text-white rounded-full">
          <FaShareAlt />
        </button>
      </div>
    </div>
  );
};

export default SharePage;
