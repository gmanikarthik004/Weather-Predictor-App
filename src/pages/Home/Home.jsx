import SearchBar from "../../Components/SearchBar/SearchBar";
import WeatherInfo from "../../Components/WeatherInfoCard/WeatherInfoCard";
import FiveDayForecast from "../../Components/5DayForecast/FiveDayForecast";
import "./Home.css";

export default function Home({ weatherData, setWeatherData, setCity }) {
  return (
    <div className="page-container">
      <SearchBar setWeatherData={setWeatherData} setCity={setCity} />
      
      {!weatherData && (
        <div className="welcome-content">
          <br></br><br></br><br></br><br></br>
          <h1>Welcome to Weather Predictor🌤️</h1>
          <p>Get instant, real-time weather updates and forecasts.</p>
          <p>Stay ahead of weather, always!</p>
        </div>
      )}

      {weatherData && <WeatherInfo weatherData={weatherData} />}
      {weatherData && <FiveDayForecast city={weatherData.name} />}
    </div>
  );
}
