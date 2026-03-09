import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="logo">
        🌍 Disaster Alert AI
        <span>Academic Research & Prototype System</span>
      </div>

      {/* LEFT LINKS */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li>AI Models</li>
        <li>Live System</li>
        <li>Contact</li>
      </ul>

      {/* RIGHT BUTTONS */}
      <div className="auth-buttons">
        <Link to="/login"><button className="btn small blue">Login</button></Link>
        <Link to="/register"><button className="btn small green">Register</button></Link>
        <Link to="/dashboard"><button className="btn small dashboard-btn">Dashboard</button></Link>
      </div>

    </nav>
  );
};

export default Navbar;