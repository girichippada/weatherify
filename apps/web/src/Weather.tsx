import React, { useEffect, useState } from 'react';
import './index.css';
import './Weather.css';

const API_URL = 'http://localhost:4000/api/weather';

function NavBar({ onSearch, onMenu }) {
  const [search, setSearch] = useState('');
  return (
    <nav className="navbar">
      <div className="navbar-logo">Weathify</div>
      <ul className="navbar-menu">
        <li onMouseEnter={() => onMenu('current')}>Current Weather</li>
        <li onMouseEnter={() => onMenu('forecast')}>Forecast</li>
      </ul>
      <form className="navbar-search" onSubmit={e => { e.preventDefault(); onSearch(search); }}>
        <input
          type="text"
          placeholder="Search city, code, zip..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
    </nav>
  );
}

function WeatherSummary({ weather, forecast }) {
  if (!weather) return null;
  return (
    <div className="summary-card">
      <h2>{weather.city}, {weather.country}</h2>
      <div className="summary-main">
        <div className="summary-temp">{weather.temperature}°C</div>
        <div className="summary-cond">{weather.condition}</div>
      </div>
      <div className="summary-details">
        <span>Humidity: {weather.humidity}%</span>
        <span>Wind: {weather.wind} km/h</span>
        <span>Rain: {weather.rainChance ?? 0}%</span>
        <span>Updated: {new Date(weather.updatedAt).toLocaleTimeString()}</span>
      </div>
      <div className="forecast-scroll">
        {forecast.map((f, i) => (
          <div className="forecast-item" key={i}>
            <div>{f.date.slice(5)}</div>
            <div>{f.temperature.toFixed(1)}°C</div>
            <div>{f.condition}</div>
            <div className={f.rainChance > 50 ? 'rain-high' : 'rain-low'}>
              {f.rainChance}% rain
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [view, setView] = useState('current');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get user's city by IP (simple fallback to London)
  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError('');
      let city = 'London';
      try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        if (ipData && ipData.city) city = ipData.city;
      } catch (e){
        console.error('Failed to get user location, defaulting to Hyderabad: '+ e);
      }
      try {
        const res = await fetch(`${API_URL}?city=${city}`);
        if (!res.ok) throw new Error('No data');
        const data = await res.json();
        setWeather(data);
        const fRes = await fetch(`${API_URL}/forecast?city=${city}`);
        setForecast(fRes.ok ? await fRes.json() : []);
      } catch (e) {
        setError('Unable to fetch weather.');
      }
      setLoading(false);
    }
    fetchWeather();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('No data');
      const [data] = await res.json();
      setWeather(data);
      const fRes = await fetch(`${API_URL}/forecast?city=${data.city}`);
      setForecast(fRes.ok ? await fRes.json() : []);
    } catch (e) {
      setError('No results found.');
    }
    setLoading(false);
  };

  return (
    <div className="weather-landing">
      <NavBar onSearch={handleSearch} onMenu={setView} />
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <>
          {view === 'current' && <WeatherSummary weather={weather} forecast={forecast} />}
          {view === 'forecast' && (
            <div className="forecast-detailed">
              <h3>7-Day Forecast for {weather?.city}:</h3>
              <div className="forecast-scroll">
                {forecast.map((f, i) => (
                  <div className="forecast-item" key={i}>
                    <div>{f.date}</div>
                    <div>{f.temperature.toFixed(1)}°C</div>
                    <div>{f.condition}</div>
                    <div className={f.rainChance > 50 ? 'rain-high' : 'rain-low'}>
                      {f.rainChance}% rain
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
