// stores/weatherStore.ts
import {create} from 'zustand';

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  sys: {
    sunrise: number;
    sunset: number;
  };
}

interface HourlyWeatherData {
  dt: number;
  temp: number;
  weather: {
    description: string;
    icon: string;
  }[];
  air_quality: number;
}

interface WeatherState {
  weatherData: WeatherData | null;
  hourlyData: HourlyWeatherData[];
  error: string | null;
  setWeatherData: (data: WeatherData) => void;
  setHourlyData: (data: HourlyWeatherData[]) => void;
  setError: (message: string) => void;
}

const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: null,
  hourlyData: [],
  error: null,
  setWeatherData: (data) => set({ weatherData: data }),
  setHourlyData: (data) => set({ hourlyData: data }),
  setError: (message: string) => set({ error: message }),
}));

export default useWeatherStore;
