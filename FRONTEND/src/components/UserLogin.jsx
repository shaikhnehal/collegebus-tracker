import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful! 🚀");
      setTimeout(() => navigate("/dashboard"), 600);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative">
      <button
        onClick={() => navigate("/home")}
        className="absolute top-6 left-6 text-white bg-[#1E293B] p-2 rounded-full shadow-md hover:bg-indigo-600 transition z-50"
      >
        <FaArrowLeft />
      </button>

      <div className="hidden md:flex flex-col justify-center items-center text-white w-1/2 h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <motion.img
          src="https://images.unsplash.com/photo-1627843240043-aa499ed215e7?w=400"
          className="w-64 mb-6 animate-bounce"
        />
        <h1 className="text-3xl font-bold">This World Needs You</h1>
        <p className="text-gray-300 mt-2">
          Sign in and begin your journey.
        </p>
      </div>

      <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-[#0D1117]">
        <motion.div className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-indigo-700">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            SIGN IN
          </h2>

          {message && (
            <div className="bg-green-200 text-green-800 p-2 rounded mb-4 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded bg-[#161B22] text-white"
            />

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded bg-[#161B22] text-white"
            />

            <button className="w-full bg-indigo-600 py-3 rounded text-white">
              CONTINUE
            </button>
          </form>

          <div className="flex gap-4 justify-center mt-5">
            <SocialButton
  icon={<FaGoogle />}
  label="Google"
  onClick={() =>
    window.location.href = "http://localhost:5000/api/auth/google"
  }
/>

<SocialButton
  icon={<FaFacebookF />}
  label="Facebook"
  onClick={() =>
    window.location.href = "http://localhost:5000/api/auth/facebook"
  }
/>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-[#161B22] text-white rounded">
    {icon} {label}
  </button>
);

export default UserLogin;
