import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "./WeatherAnalysis.css";

export default function WeatherAnalysis({ city }) {
  const [forecast, setForecast] = useState([]);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    if (city) {
      fetchForecast(city);
    }
  }, [city]);

  const fetchForecast = async (cityName) => {
    try {
      const apiKey = "516cbe8a213aa66797acbccb3c02a0cf";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (data.list) {
        const dailyData = [];
        const dates = new Set();

        data.list.forEach((reading) => {
          const date = reading.dt_txt.split(" ")[0];
          if (!dates.has(date) && reading.dt_txt.includes("12:00:00")) {
            dates.add(date);
            dailyData.push({
              date: date,
              temp: reading.main.temp,
              humidity: reading.main.humidity,
              windSpeed: reading.wind.speed,
            });
          }
        });

        setForecast(dailyData);
        calculateInsights(dailyData);
      }
    } catch (error) {
      console.error("Error fetching weather analysis data:", error);
      setForecast([]);
    }
  };

  const calculateInsights = (data) => {
    if (data.length === 0) return;

    const hottest = data.reduce((max, day) => (day.temp > max.temp ? day : max), data[0]);
    const coldest = data.reduce((min, day) => (day.temp < min.temp ? day : min), data[0]);
    const mostHumid = data.reduce((max, day) => (day.humidity > max.humidity ? day : max), data[0]);
    const windiest = data.reduce((max, day) => (day.windSpeed > max.windSpeed ? day : max), data[0]);

    setInsights({
      hottest,
      coldest,
      mostHumid,
      windiest,
    });
  };

  return (
    <div className="weather-analysis-container">
      <h3><b>Weather Trends & Insights for {city} 🌦️</b></h3>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;Explore detailed weather analysis and trends for {city} to stay ahead of the forecast! 🌤️📊</p>

      <br></br>

      {forecast.length > 0 ? (
        <>
        {/* Temperature Chart */}
          <div className="charts-container">
          <h3>🌡️ Temperature Trends (°C)</h3>
            <div className="chart">
            <br></br>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="temp" stroke="#ff7300" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Humidity Chart */}
            <h3>💧 Humidity Trends (%)</h3>
            <div className="chart">
              <br></br>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="humidity" stroke="#007bff" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Wind Speed Chart */}
            <h3>🌬️ Wind Speed Trends (m/s)</h3>
            <div className="chart">
              <br></br>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="windSpeed" stroke="#28a745" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights Section */}
          <div className="insights-container">
          <br></br><br></br>
            <h2>📊 In-depth Weather Insights</h2>
            <p>Have a look at more in-depth data insights in your selected city</p>
            <br></br>
            {insights && (
              <div className="insights">
                <div className="insight-card hottest">
                  <h3>🔥 Hottest Day</h3>
                  <p>{insights.hottest.date}</p>
                  <p>{insights.hottest.temp}°C</p>
                </div>

                <div className="insight-card coldest">
                  <h3>❄️ Coldest Day</h3>
                  <p>{insights.coldest.date}</p>
                  <p>{insights.coldest.temp}°C</p>
                </div>

                <div className="insight-card humid">
                  <h3>💦 Most Humid Day</h3>
                  <p>{insights.mostHumid.date}</p>
                  <p>{insights.mostHumid.humidity}%</p>
                </div>

                <div className="insight-card windy">
                  <h3>💨 Windiest Day</h3>
                  <p>{insights.windiest.date}</p>
                  <p>{insights.windiest.windSpeed} m/s</p>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>No data available. Please enter a valid city.</p>
      )}
    </div>
  );
}
