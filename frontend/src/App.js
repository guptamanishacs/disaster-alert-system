import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AboutPage from "./components/AboutPage";

import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Analytics from "./components/Analytics";
import AISimulation from "./components/AISimulation";

// Backend API URL from .env
const API_URL = process.env.REACT_APP_API_URL;

// USER PROTECTED ROUTE
const UserRoute = ({ children }) => {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;
  if (!user) return <Navigate to="/login" />; // redirect to login
  if (user.isAdmin) return <Navigate to="/admin" />; // if admin, go to admin
  return children;
};

// ADMIN PROTECTED ROUTE
const AdminRoute = ({ children }) => {
  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;
  if (!user) return <Navigate to="/login" />;
  if (!user.isAdmin) return <Navigate to="/dashboard" />; // if normal user, go to user dashboard
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage API_URL={API_URL} />} />
        <Route path="/login" element={<LoginPage API_URL={API_URL} />} />
        <Route path="/register" element={<RegisterPage API_URL={API_URL} />} />
        <Route path="/about" element={<AboutPage />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <UserDashboard API_URL={API_URL} />
            </UserRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard API_URL={API_URL} />
            </AdminRoute>
          }
        />

        {/* Analytics */}
        <Route path="/analytics" element={<Analytics API_URL={API_URL} />} />

        {/* AI Simulation */}
        <Route path="/aisimulation" element={<AISimulation API_URL={API_URL} />} />

        {/* Catch all unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;