import React from 'react';

function WeatherCard({ data }) {
  const { name, main, weather, wind, sys } = data;
  
  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear')) return '☀️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('thunder')) return '⛈️';
    if (conditionLower.includes('mist') || conditionLower.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{name}, {sys.country}</h2>
        <p className="last-updated">Last updated: {formatTime(data.dt)}</p>
      </div>
      
      <div className="weather-main">
        <div className="temperature-section">
          <span className="weather-icon">{getWeatherIcon(weather[0].description)}</span>
          <span className="temperature">{Math.round(main.temp)}°C</span>
        </div>
        <p className="condition">{weather[0].description}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <div className="detail-info">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{Math.round(wind.speed)} m/s</span>
          </div>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <div className="detail-info">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{main.humidity}%</span>
          </div>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <div className="detail-info">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{Math.round(main.feels_like)}°C</span>
          </div>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <div className="detail-info">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
