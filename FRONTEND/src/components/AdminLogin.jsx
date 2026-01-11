import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      return setMessage("❌ All fields are required");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const { token, user } = res.data;

      // ✅ ROOT FIX (MOST IMPORTANT)
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role.toLowerCase()); // admin / driver

      setMessage("✅ Login successful");

      setTimeout(() => {
        if (user.role.toLowerCase() === "admin") {
          navigate("/admin-dashboard", { replace: true });
        } else if (user.role.toLowerCase() === "driver") {
          navigate("/driver-panel", { replace: true });
        }
      }, 300);

    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div style={containerStyle}>
      <FaArrowLeft onClick={() => navigate("/home")} style={backBtn} />

      <div style={cardStyle}>
        <h2 style={titleStyle}>Admin / Driver Login</h2>

        {message && <div style={messageStyle(message)}>{message}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Login Now
          </button>
        </form>
      </div>
    </div>
  );
};

/* ===== STYLES ===== */

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage:
    'url("https://bansalgroup-assets.s3.ap-south-1.amazonaws.com/STG/Test_BGI_Bhopal/Transportation2.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const backBtn = {
  position: "absolute",
  top: 20,
  left: 20,
  cursor: "pointer",
  color: "#fff",
  backgroundColor: "#dc2626",
  borderRadius: "50%",
  padding: "8px",
  fontSize: "22px",
};

const cardStyle = {
  background: "#fff",
  padding: "40px",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "420px",
  border: "2px solid #dc2626",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#dc2626",
  fontWeight: "900",
  fontSize: "26px",
};

const messageStyle = (msg) => ({
  marginBottom: "15px",
  padding: "10px",
  borderRadius: "6px",
  backgroundColor: msg.includes("✅") ? "#e0f7e9" : "#fdecea",
  color: msg.includes("✅") ? "#2e7d32" : "#d32f2f",
  textAlign: "center",
});

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "700",
};

export default AdminLogin;
