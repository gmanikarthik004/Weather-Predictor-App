import React, { useEffect, useState } from "react";
import "./RecentSearches.css";

export default function RecentSearches({ setCity }) {
  const [recentCities, setRecentCities] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const loadSearches = () => {
      const savedSearches = JSON.parse(localStorage.getItem("recentCities")) || [];
      setRecentCities([...new Set(savedSearches)]); // Remove duplicates
    };

    loadSearches();
    window.addEventListener("storage", loadSearches); // Listen for changes

    return () => {
      window.removeEventListener("storage", loadSearches); // Cleanup on unmount
    };
  }, []);

  // Handle city click
  const handleCityClick = (city) => {
    if (city !== recentCities[0]) { // Avoid setting the same city again
      setCity(city);
    }
  };

  // Clear search history
  const clearHistory = () => {
    localStorage.removeItem("recentCities");
    setRecentCities([]);
  };

  return (
    <div className="recent-searches-container">
      <h2>Recent Searches</h2>
      {recentCities.length > 0 ? (
        <>
          <ul>
            {recentCities.map((city, index) => (
              <li key={index} onClick={() => handleCityClick(city)}>
                {city}
              </li>
            ))}
          </ul>
          <button className="clear-history-btn" onClick={clearHistory}>Clear History</button>
        </>
      ) : (
        <p>No recent searches yet.</p>
      )}
    </div>
  );
}
