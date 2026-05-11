import type {WeatherResponse} from './types.js';
import { Coordinate,DailyForecast } from './types.js';

export async function fetchWeather(coords:Coordinate):Promise<WeatherResponse>{
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=apparent_temperature,temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&timezone=auto`);
    console.log(response);
    
    if (!response.ok){
        throw new Error(`${response.status}`);
    }

    const data = await response.json() as WeatherResponse;    
    return data;

}
export async function fetchDailyForecast(coords:Coordinate):Promise<DailyForecast> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code,apparent_temperature_max,apparent_temperature_min,precipitation_probability_mean&timezone=auto`;
    const responce = await fetch(url);

    if(!responce.ok){
        throw new Error(`${responce.status}`);
    }
    const data = await responce.json();
    
    
    return data.daily as DailyForecast;
}