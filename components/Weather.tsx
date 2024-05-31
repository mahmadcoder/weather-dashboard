// components/Weather.tsx
"use client";
import { useEffect } from 'react';
import axios from 'axios';
import useWeatherStore from '@/lib/weatherStore';
import HourlyForecast from './HourlyForecast';



const Weather: React.FC = () => {

  // const apiKey = process.env.NEXT_WEATHER_KEY;
  const { weatherData, error, setWeatherData, setHourlyData, setError } = useWeatherStore();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
          fetchHourlyData(latitude, longitude);
        },
        () => {
          setError("Geolocation not supported or permission denied");
        }
      );
    } else {
      setError("Geolocation not supported by this browser");
    }
  }, [setError]);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b8d782789ffa26bafec2b2bc702ced9b&units=metric`
      );
      setWeatherData(response.data);
    } catch {
      setError("Error fetching weather data");
    }
  };

  const fetchHourlyData = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b8d782789ffa26bafec2b2bc702ced9b&units=metric`
      );
      const airQualityResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=b8d782789ffa26bafec2b2bc702ced9b`
      );
      const hourlyData = response.data.list.slice(0, 5).map((data:any, index:number) => ({
        ...data,
        air_quality: airQualityResponse.data.list[index].main.aqi
      }));
      setHourlyData(hourlyData);
    } catch {
      setError("Error fetching hourly weather data");
    }
  };

  const getBackgroundImage = (description: string) => {
    switch (description.toLowerCase()) {
      case 'clear sky':
        return 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=1500&q=80';
      case 'few clouds':
        return 'https://images.unsplash.com/photo-1495733715281-8735303d1af2?fit=crop&w=1500&q=80';
      case 'scattered clouds':
        return 'https://images.unsplash.com/photo-1482879512477-2d564d4b1247?fit=crop&w=1500&q=80';
      case 'broken clouds':
        return 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=1500&q=80';
      case 'shower rain':
        return 'https://images.unsplash.com/photo-1562680192-230c9d7e9dc0?fit=crop&w=1500&q=80';
      case 'rain':
        return 'https://images.unsplash.com/photo-1504033014987-d957a9f86c79?fit=crop&w=1500&q=80';
      case 'thunderstorm':
        return 'https://images.unsplash.com/photo-1504051771394-dd2e309d570b?fit=crop&w=1500&q=80';
      case 'snow':
        return 'https://images.unsplash.com/photo-1543584536-cfeb6287d087?fit=crop&w=1500&q=80';
      case 'mist':
        return 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?fit=crop&w=1500&q=80';
      default:
        return 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=1500&q=80';
    }
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!weatherData) {
    return <div className="text-center pt-4">Loading...</div>;
  }

  const { name, main, weather } = weatherData;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const backgroundImageUrl = getBackgroundImage(weather[0].description);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 21) return "evening";
    return "night";
  };

  return (
    <div 
      className="max-w-sm mx-auto mt-6 bg-cover bg-center rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="md:flex bg-black bg-opacity-50">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={iconUrl} alt={weather[0].description} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-white font-semibold">{name}</div>
          <p className="block mt-1 text-lg leading-tight font-medium text-white">Temperature: {main.temp}°C</p>
          <p className="mt-2 text-gray-200">Condition: {weather[0].description}</p>
          <p className="mt-2 text-gray-200">Time of day: {getTimeOfDay()}</p>
        </div>
      </div>
      <HourlyForecast />
    </div>
  );
};

export default Weather;
