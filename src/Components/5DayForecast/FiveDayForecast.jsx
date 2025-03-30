import React, { useState, useEffect } from "react";
import "./FiveDayForecast.css";

export default function FiveDayForecast({ city }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (city) {
      fetchForecast(city);
    }
  }, [city]);

  const fetchForecast = async (cityName) => {
    try {
      const apiKey = "516cbe8a213aa66797acbccb3c02a0cf"; // Replace with your API Key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (data.list) {
        // Filter the data to get one forecast per day (every 24 hours)
        const dailyData = [];
        const dates = new Set();
        
        data.list.forEach((reading) => {
          const date = reading.dt_txt.split(" ")[0];
          if (!dates.has(date) && reading.dt_txt.includes("12:00:00")) {
            dates.add(date);
            dailyData.push(reading);
          }
        });
        
        setForecast(dailyData);
      } else {
        setForecast([]); // Clear forecast if data is not available
      }
    } catch (error) {
      console.error("Error fetching 5-day forecast:", error);
      setForecast([]); // Handle errors by resetting forecast
    }
  };

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      {forecast.length > 0 ? (
        <div className="forecast-cards">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <p>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p>{Math.round(day.main.temp)}°C</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No forecast available. Please enter a valid city.</p>
      )}
    </div>
  );
}