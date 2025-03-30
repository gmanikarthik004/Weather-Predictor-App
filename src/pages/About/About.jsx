import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Weather Predictor</h1>
      <p className="tagline">
        Your personal weather assistant for real-time forecasts and health insights.
      </p>

      <div className="about-section">
        <h2>🌦 <b>What is WeatherWise?</b></h2>
        <p>
  <strong>Weather Predictor</strong> is a sleek, feature-packed weather dashboard powered by <strong>React.js</strong>. It delivers real-time weather updates, accurate forecasts, and essential health advisories to keep you informed. Our goal is to help you make smart, weather-driven decisions and stay prepared for every day, no matter the forecast. 🌤️🌧️💡
</p>

      </div>

      <div className="about-section">
        <h2>⚡ <b>Key Features</b></h2>
        <ul>
          <li>🌍 Real-time weather updates for cities across India</li>
          <li>📌 Quick access to recent search history</li>
          <li>📅 5-day forecast with detailed analysis & insights</li>
          <li>🗺️ Interactive weather maps for easy visualization</li>
          <li>🩺 Health tips tailored to weather conditions</li>
          <li>🌙 Dark/light mode toggle for easy viewing</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>🔗 Data Sources</h2>
        <p>The <strong>Weather Predictor</strong> app provides accurate, real-time weather updates powered by the reliable <strong>OpenWeatherMap API</strong>.</p>
      </div>

      <div className="about-footer">
        <p className="footer">© 2025 All rights reserved. | Designed with ❤️ by G Mani Karthik</p>
      </div>
    </div>
  );
};

export default About;
