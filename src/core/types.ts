export interface CurrentWeather {
    temperature:number;
    windSpeed:number;
    humidity:number;
    weatherCode:number;
}

export interface WeatherResponse{
    current:{
        temperature_2m:number;
        time:string;
        interval?:number;
        wind_speed_10m:number;
        weather_code:number;
        relative_humidity_2m:number;
    }
}

export interface Coordinate{
    latitude:number;
    longitude:number    
} 

export type CityMap = {
    vitebsk:{latitude:number,longitude:number},
    minsk:{latitude:number,longitude:number},
    gomel:{latitude:number,longitude:number},
    mogilev:{latitude:number,longitude:number},
    grodno:{latitude:number,longitude:number},
    brest:{latitude:number,longitude:number},
}

