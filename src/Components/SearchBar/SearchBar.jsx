import { useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import "./SearchBar.css";

export default function SearchBar({ setWeatherData, setCity }) {
  const [cityInput, setCityInput] = useState("");
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [searchedCities, setSearchedCities] = useState([]); // Track searched cities

const fetchWeather = async () => {
  if (!cityInput.trim()) {
    setError("Please enter a city name.");
    return;
  }

  // Check if the city has already been searched
  const savedSearches = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (savedSearches.includes(cityInput.trim().toLowerCase())) {
    setError("Weather data for this city has already been fetched.");
    return;
  }

  const API_KEY = "516cbe8a213aa66797acbccb3c02a0cf";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(URL);
    const fetchedWeatherData = response.data;

    setWeather(fetchedWeatherData); // Set weather data
    setWeatherData(fetchedWeatherData);
    setCity(fetchedWeatherData.name);

    // Save to recent searches in localStorage
    const updatedSearches = [fetchedWeatherData.name, ...savedSearches].slice(0, 5); // Store last 5 searches
    localStorage.setItem("recentCities", JSON.stringify(updatedSearches));

    setError(null);
  } catch (error) {
    setError("City not found! Please enter a valid city.");
  }
  setCityInput(""); // Clear input after search
};

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="&nbsp;&nbsp;&nbsp;Enter the city name"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button onClick={fetchWeather}>
          <Search />
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={() => setError(null)}>✖</button>
        </div>
      )}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="temp">{weather.main.temp}°C</p>
          </div>
          <p className="weather-description">{weather.weather[0].description}</p>
          <div className="weather-details">
            <p><strong>🌡️ Feels Like:</strong> {weather.main.feels_like}°C</p>
            <p><strong>💧 Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>📌 Pressure:</strong> {weather.main.pressure} hPa</p>
            <p><strong>🌬️ Wind:</strong> {weather.wind.speed} m/s</p>
            <p><strong>🌅 Sunrise:</strong> {formatTime(weather.sys.sunrise)}</p>
            <p><strong>🌇 Sunset:</strong> {formatTime(weather.sys.sunset)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
