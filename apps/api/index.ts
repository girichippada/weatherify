// API backend (Express + TypeScript)
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { WeatherData } from '../../packages/shared-types';
import axios from 'axios';
import logRequest from './logMiddleware';
import logger from './logger';
import WeatherDataStub from './stubs/WeatherDataStub'; // Stubbed weather data


const app = express();
const PORT = process.env.PORT || 4000;

app.use(logRequest);
app.use(cors());
app.use(express.json());

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY || '<YOUR_API_KEY_HERE>';
const WEATHERSTACK_BASE_URL = process.env.WEATHERSTACK_URI || 'http://api.weatherstack.com';
const WEATHER_STUB = WeatherDataStub

// In-memory weather data for multiple cities
let weatherData: Record<string, WeatherData & { humidity?: number; wind?: number }> = {
  'London': {
    city: 'London', country: 'UK', temperature: 20, condition: 'Cloudy', humidity: 60, wind: 10, updatedAt: new Date().toISOString(),
  },
  'New York': {
    city: 'New York', country: 'USA', temperature: 25, condition: 'Sunny', humidity: 55, wind: 12, updatedAt: new Date().toISOString(),
  },
};

// Helper to fetch from Weatherstack
async function fetchWeatherstack(city: string) {
  try {
    // const res = await axios.get(`${WEATHERSTACK_BASE_URL}/current`, {
    //   params: {
    //     access_key: WEATHERSTACK_API_KEY,
    //     query: city,
    //   },
    // });
    const res =  WEATHER_STUB; // Replace with actual API call when ready

    logger.info(`using apikey: ${WEATHERSTACK_API_KEY}`);
    logger.info(`Weatherstack response for ${city}:`, res.data);
    if (res.data && res.data.current) {
      return {
        city: res.data.location.name,
        country: res.data.location.country,
        temperature: res.data.current.temperature,
        condition: res.data.current.weather_descriptions[0],
        humidity: res.data.current.humidity,
        wind: res.data.current.wind_speed,
        updatedAt: new Date().toISOString(),
        rainChance: res.data.current.precip,
      };
    }
    return null;
  } catch (e) {
    console.error(`Failed to fetch weather for ${city}:`, e.message);
    return null;
  }
}

// GET /api/weather?city=CityName
app.get('/api/weather', async (req, res) => {
  const city = req.query.city as string;
  if (city) {
    // Try Weatherstack first
    const wsData = await fetchWeatherstack(city);
    if (wsData) {
      weatherData[city] = wsData;
      return res.json(wsData);
    }
    // Fallback to stub
    if (weatherData[city]) return res.json(weatherData[city]);
    return res.status(404).json({ error: 'City not found' });
  } else {
    // Return all stubbed data
    res.json(Object.values(weatherData));
  }
});

// POST /api/weather (update or add city)
app.post('/api/weather', (req, res) => {
  const { city, country, temperature, condition, humidity, wind } = req.body;
  if (!city || !country) return res.status(400).json({ error: 'City and country required' });
  weatherData[city] = {
    city,
    country,
    temperature,
    condition,
    humidity,
    wind,
    updatedAt: new Date().toISOString(),
  };
  res.json(weatherData[city]);
});

// GET /api/weather/cities (list all cities)
app.get('/api/weather/cities', (req, res) => {
  res.json(Object.keys(weatherData));
});

// DELETE /api/weather?city=CityName (delete a city)
app.delete('/api/weather', (req, res) => {
  const city = req.query.city as string;
  if (city && weatherData[city]) {
    delete weatherData[city];
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

// GET /api/weather/forecast?city=CityName (stubbed forecast)
app.get('/api/weather/forecast', async (req, res) => {
  const city = req.query.city as string;
  // Try Weatherstack forecast (not available on free tier, so fallback to stub)
  if (!city || !weatherData[city]) return res.status(404).json({ error: 'City not found' });
  // Stubbed 7-day forecast
  const forecast = Array.from({ length: 7 }).map((_, i) => ({
    date: new Date(Date.now() + i * 86400000).toISOString().slice(0, 10),
    temperature: weatherData[city].temperature + (Math.random() * 4 - 2),
    condition: weatherData[city].condition,
    humidity: weatherData[city].humidity,
    wind: weatherData[city].wind,
    rainChance: Math.round(Math.random() * 100),
  }));
  res.json(forecast);
});

// GET /api/weather/search?query=... (search by city, code, or zip)
app.get('/api/weather/search', async (req, res) => {
  const query = req.query.query as string;
  if (!query) return res.status(400).json({ error: 'Query required' });
  // Try Weatherstack
  const wsData = await fetchWeatherstack(query);
  if (wsData) return res.json([wsData]);
  // Fallback: search stub
  const results = Object.values(weatherData).filter(
    w => w.city.toLowerCase().includes(query.toLowerCase()) ||
         w.country.toLowerCase().includes(query.toLowerCase())
  );
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Weather API server running on port ${PORT}`);
});

export default app;
