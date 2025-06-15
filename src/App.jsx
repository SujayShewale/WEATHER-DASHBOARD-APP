import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="app-container">
      <h1>Weather Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
