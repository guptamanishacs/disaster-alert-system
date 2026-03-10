import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import API_URL from "../config"; // ✅ Backend URL from config.js

export default function LoginPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); // "user" or "admin"
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      // 🔗 API call to backend
      const res = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      console.log("✅ Backend Response:", res.data);

      const userData = res.data;

      // ❗ ROLE VALIDATION
      if (role === "admin" && !userData.isAdmin) {
        alert("❌ You are not an Admin");
        return;
      }

      if (role === "user" && userData.isAdmin) {
        alert("❌ Please login from Admin tab");
        return;
      }

      // 💾 Save user in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      alert(`✅ Welcome ${userData.name}`);

      // 🚀 Redirect
      if (userData.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);

      const errorMsg =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "❌ Login failed!";

      alert(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">🔐 Secure Login Portal</h1>
        <p className="subtitle">AI Disaster Prediction & Alert System</p>

        {/* 👤 ROLE TOGGLE */}
        <div className="role-toggle">
          <button
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            👤 User Login
          </button>

          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            🛡️ Admin Login
          </button>
        </div>

        {/* 📝 LOGIN FORM */}
        <form className="form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={role === "admin" ? "Enter Admin Email" : "Enter Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type={showPass ? "text" : "password"}
            placeholder={role === "admin" ? "Enter Admin Password" : "Enter Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* 👁 Show/Hide Password */}
          <span className="show-pass" onClick={() => setShowPass(!showPass)}>
            {showPass ? "🙈 Hide Password" : "👁 Show Password"}
          </span>

          {/* 🔘 Submit Button */}
          <button
            type="submit"
            className={role === "admin" ? "btn login-admin" : "btn login-user"}
          >
            {role === "admin" ? "Login as Admin" : "Login as User"}
          </button>
        </form>

        {/* ⚠️ Footer */}
        <div className="login-footer">
          <p>⚠️ Authorized Access Only</p>
        </div>
      </div>
    </div>
  );
}