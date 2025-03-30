import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { 
  FaHome, FaHistory, FaChartBar, FaNewspaper, 
  FaHeartbeat, FaInfoCircle, FaMoon, FaSun 
} from "react-icons/fa"; 

export default function Sidebar({ darkMode, setDarkMode }) {
  return (
    <div className={`sidebar ${darkMode ? "dark" : "light"}`}>
      
      {/* Website Title */}
      <h2 className="sidebar-title">🔆Weather Predictor</h2>
      <br></br>

      {/* Sidebar Menu */}
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}> 
            <div className="menu-item">
              <FaHome className="icon" /> <span><b>Home</b></span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/recent-searches" className={({ isActive }) => (isActive ? "active" : "")}> 
            <div className="menu-item">
              <FaHistory className="icon" /> <span>Recent Searches</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/weather-analysis" className={({ isActive }) => (isActive ? "active" : "")}> 
            <div className="menu-item">
              <FaChartBar className="icon" /> <span>Weather Analysis</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/weather-news" className={({ isActive }) => (isActive ? "active" : "")}> 
            <div className="menu-item">
              <FaNewspaper className="icon" /> <span>Weather Blogs</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/health-advisories" className={({ isActive }) => (isActive ? "active" : "")}> 
            <div className="menu-item">
              <FaHeartbeat className="icon" /> <span>General Health Tips</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}> 
            <div className="menu-item">
              <FaInfoCircle className="icon" /> <span>About Us</span>
            </div>
          </NavLink>
        </li>
      </ul>

      <hr></hr><hr></hr>
      <br></br>
      {/* Dark Mode Toggle */}
      <div className="toggle-container" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </div>
    </div>
  );
}
