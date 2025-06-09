export const weatherData = {
    "status": "success",
    "data": {
        "request": {
            "type": "City",
            "query": "New Delhi, India",
            "language": "en",
            "unit": "m"
        },
        "location": {
            "name": "New Delhi",
            "country": "India",
            "region": "Delhi",
            "lat": "28.600",
            "lon": "77.200",
            "timezone_id": "Asia/Kolkata",
            "localtime": "2025-06-09 17:58",
            "localtime_epoch": 1749491880,
            "utc_offset": "5.50"
        },
        "current": {
            "observation_time": "12:28 PM",
            "temperature": 43,
            "weather_code": 143,
            "weather_icons": [
                "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0006_mist.png"
            ],
            "weather_descriptions": [
                "Haze"
            ],
            "astro": {
                "sunrise": "05:23 AM",
                "sunset": "07:18 PM",
                "moonrise": "05:48 PM",
                "moonset": "03:31 AM",
                "moon_phase": "Waxing Gibbous",
                "moon_illumination": 95
            },
            "air_quality": {
                "co": "451.4",
                "no2": "11.84",
                "o3": "293",
                "so2": "48.84",
                "pm2_5": "165.76",
                "pm10": "733.895",
                "us-epa-index": "5",
                "gb-defra-index": "5"
            },
            "wind_speed": 20,
            "wind_degree": 303,
            "wind_dir": "WNW",
            "pressure": 999,
            "precip": 0,
            "humidity": 19,
            "cloudcover": 0,
            "feelslike": 45,
            "uv_index": 1,
            "visibility": 5,
            "is_day": "yes"
        }
    }
};

export default weatherData;