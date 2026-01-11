import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import api from "../api/axios";

const UserRegister = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/register", {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
      });

      navigate("/user-login");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E2C8A4]">
      <motion.div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <button onClick={() => navigate(-1)} className="mb-3">
          <FaArrowLeft />
        </button>

        <h2 className="text-3xl font-bold text-center mb-4">Register</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <Input icon={<FaUser />} name="firstName" placeholder="First Name" onChange={handleChange} />
          <Input icon={<FaUser />} name="lastName" placeholder="Last Name" onChange={handleChange} />
          <Input icon={<FaEnvelope />} name="email" placeholder="Email" onChange={handleChange} />
          <Input icon={<FaLock />} name="password" placeholder="Password" type="password" onChange={handleChange} />
          <Input icon={<FaLock />} name="confirmPassword" placeholder="Confirm Password" type="password" onChange={handleChange} />

          <button className="w-full bg-[#6E4B3E] text-white py-3 rounded">
            REGISTER
          </button>

          <p className="text-center text-sm">
            Already registered? <Link to="/user-login">Login</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

const Input = ({ icon, ...props }) => (
  <div className="flex items-center gap-2 border p-2 rounded">
    {icon}
    <input {...props} required className="flex-1 outline-none" />
  </div>
);

export default UserRegister;
