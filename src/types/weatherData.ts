export interface WeatherData {
  current?: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    weathercode: number;
  };
  current_units?: {
    wind_speed_10m: string;
    precipitation: string;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  };
}