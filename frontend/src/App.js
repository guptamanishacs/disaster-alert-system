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
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Analytics */}
        <Route path="/analytics" element={<Analytics />} />

        {/* AI Simulation */}
        <Route path="/aisimulation" element={<AISimulation />} />

        {/* Catch all unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;