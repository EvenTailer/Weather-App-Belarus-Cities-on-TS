import type {WeatherResponse} from './types.js';
import { Coordinate } from './types.js';

export async function fetchWeather(coords:Coordinate):Promise<WeatherResponse>{
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&timezone=auto`)
    if (!response.ok){
        throw new Error(`${response.status}`);
    }

    const data = await response.json() as WeatherResponse;    
    console.log(data);
    
    return data;

}