import React from "react";
import "./HealthAdvisories.css";
import { FaTint, FaWind, FaSun } from "react-icons/fa"; // Import icons

const HealthAdvisories = () => {
  const advisories = [
    {
      id: 1,
      title: "Stay Hydrated",
      description:
        "High temperatures can cause dehydration. Drink plenty of water and avoid prolonged sun exposure.",
      icon: <FaTint size={40} className="advisory-icon" />,
    },
    {
      id: 2,
      title: "Air Pollution Alert",
      description:
        "Poor air quality due to weather conditions. Wear a mask outdoors and avoid high-traffic areas.",
      icon: <FaWind size={40} className="advisory-icon" />,
    },
    {
      id: 3,
      title: "UV Radiation Warning",
      description:
        "Strong UV rays can cause skin damage. Apply sunscreen and wear protective clothing when outside.",
      icon: <FaSun size={40} className="advisory-icon" />,
    },
  ];

  return (
    <div className="health-advisories-container">
      <h2><b>General Health Advisories ⚕️🌡️</b></h2>
      <p className="general">Important health guidelines to follow in all weather conditions for people of all ages. Stay safe and take precautions to protect yourself and your loved ones from extreme weather! 🌞❄️🌧️</p>
      <br></br>
      <div className="advisory-cards">
        {advisories.map((advisory) => (
          <div key={advisory.id} className="advisory-card">
            {advisory.icon}
            <h3><b>{advisory.title}</b></h3>
            <p className="data">{advisory.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthAdvisories;
