"use client"
import React from 'react';
import useWeatherStore from '@/lib/weatherStore';
const HourlyForecast: React.FC = () => {
  const { hourlyData } = useWeatherStore();

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    return strTime;
  };

  if (hourlyData.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-black bg-opacity-50 rounded-xl text-white">
      <h2 className="text-xl font-semibold mb-4">Next 5 Hours</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {hourlyData.map((data) => (
          <div key={data.dt} className="p-2 bg-gray-700 rounded-lg">
            <p className="text-lg">{formatTime(data.dt)}</p>
            <img
              className="h-12 w-12 mx-auto"
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
            />
            <p>{data.temp}°C</p>
            <p>{data.weather[0].description}</p>
            <p>Air Quality: {data.air_quality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
