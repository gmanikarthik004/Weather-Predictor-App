import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import RecentSearches from "./pages/RecentSearches/RecentSearches";
import WeatherAnalysis from "./pages/WeatherAnalysis/WeatherAnalysis";
import WeatherNews from "./pages/WeatherNews/WeatherNews";
import HealthAdvisories from "./pages/HealthAdvisories/HealthAdvisories";
import About from "./pages/About/About";
import "./App.css";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode", !darkMode);
    document.body.classList.toggle("light-mode", darkMode);
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
        <Sidebar darkMode={darkMode} setDarkMode={toggleDarkMode} />

        <div className="main-content">
          {/* Define Routes */}
          <Routes>
            <Route
              path="/"
              element={<Home weatherData={weatherData} setWeatherData={setWeatherData} setCity={setCity} />}
            />
            <Route path="/recent-searches" element={<RecentSearches setCity={setCity} />} />
            <Route path="/weather-analysis" element={<WeatherAnalysis city={city} />} />
            <Route path="/weather-news" element={<WeatherNews />} />
            <Route path="/health-advisories" element={<HealthAdvisories />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
