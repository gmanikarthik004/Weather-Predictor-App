import React, { useEffect, useState } from "react";
import "./WeatherNews.css";

const WeatherNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Dummy weather news data (Replace this with API integration later)
    const dummyNews = [
      {
        title: "Heavy Rainfall Expected in Coastal Areas",
        description: "Meteorologists predict heavy rains in coastal regions this weekend.",
        url: "#",
      },
      {
        title: "Heatwave Alert Issued for Northern States",
        description: "Temperatures are expected to rise above 45°C in some northern states.",
        url: "#",
      },
      {
        title: "Cyclone Formation Likely in the Bay of Bengal",
        description: "Early reports suggest a cyclone might form in the Bay of Bengal next week.",
        url: "#",
      },
    ];
    setNews(dummyNews);
  }, []);

  return (
    <div className="weather-news-container">
      <h2>Latest Weather News 📰🌧️</h2>
      <p className="para">Stay updated with the latest news </p>
      <p className="para">on weather events and recent conditions around the world! 🌍⚡</p>
      <br></br><br></br>
      <div className="news-cards">
        {news.map((article, index) => (
          <div key={index} className="news-card">
            <h3><b>{article.title}</b></h3>
            <p>{article.description}</p>
            <a href={article.url}>Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherNews;
