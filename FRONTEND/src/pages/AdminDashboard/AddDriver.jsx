// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api from '../../api/axios';

// const AddDriver = () => {
//   const [form, setForm] = useState({
//     name: '',
//     contact: '',
//     email: '',
//     licenseNumber: '',
//     address: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/drivers', {
//         ...form,
//         role: 'DRIVER',
//       });

//       alert('✅ Driver added successfully');
//       navigate(-1);
//     } catch (err) {
//       alert('❌ Failed to add driver');
//     }
//   };

//   return (
//     <div className="w-screen h-[100dvh] bg-gray-100 flex items-center justify-center px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-xl bg-white p-8 rounded-xl shadow-xl"
//       >
//         <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
//           Add New Driver
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input name="name" placeholder="Driver Name" onChange={handleChange} className="w-full p-3 border rounded" required />
//           <input name="contact" placeholder="Contact Number" onChange={handleChange} className="w-full p-3 border rounded" required />
//           <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded" />
//           <input name="licenseNumber" placeholder="License Number" onChange={handleChange} className="w-full p-3 border rounded" required />
//           <input name="address" placeholder="Address" onChange={handleChange} className="w-full p-3 border rounded" required />

//           <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//             Add Driver
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AddDriver;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const AddDriver = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    contact: "",          // ✅ FIXED (mobile ❌ → contact ✅)
    licenseNumber: "",
    address: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMsg("❌ Admin not logged in");
        return;
      }

      // 🔍 DEBUG (remove later if you want)
      console.log("Submitting Driver:", form);

      await axios.post(
        "http://localhost:5000/api/driver/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("✅ Driver added successfully");

      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 1000);

    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "❌ Error adding driver");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Add Driver
        </h2>

        {msg && (
          <p className="text-center text-sm font-medium text-red-600">
            {msg}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Driver Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          value={form.licenseNumber}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Driver
        </button>
      </motion.form>
    </div>
  );
};

export default AddDriver;
