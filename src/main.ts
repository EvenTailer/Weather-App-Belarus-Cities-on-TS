import { fetchWeather } from "./core/weatherServise.js";
import { CityMap } from "./core/types.js";
const coords: CityMap = {
    vitebsk: { latitude: 55.1904, longitude: 30.2049 },
    minsk: { latitude: 53.9, longitude: 27.5667 },
    gomel: { latitude: 52.4345, longitude: 30.9754 },
    mogilev: { latitude: 53.9168, longitude: 30.3449 },
    grodno: { latitude: 53.6884, longitude: 23.8258 },
    brest: { latitude: 52.0975, longitude: 23.6877 },
}
const cityNames: Record<string, string> = {
    vitebsk: 'Витебск',
    minsk: 'Минск',
    gomel: 'Гомель',
    mogilev: 'Могилёв',
    grodno: 'Гродно',
    brest: 'Брест'
}
const showWeather = document.getElementById('showInfoWeather');
const select = document.getElementById('cities');
if(select){let optionsHtml = '<option value="">-- Выберите город --</option>';
Object.keys(coords).forEach(cityKey => {
    optionsHtml += `<option value="${cityKey}">${cityNames[cityKey]}</option>`
});
select.innerHTML = optionsHtml;
}

select?.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    const selectedCityKey = target.value;
    console.log(selectedCityKey);

    const cityCoords = coords[selectedCityKey as keyof typeof coords];
    const cityName = cityNames[selectedCityKey];
    fetchWeather(cityCoords).then(data => {
        console.log(cityCoords);
        

        if (showWeather) {
            showWeather.innerHTML = `
        <div class="weather-card">
            <div class= "city-name">${cityName}</div>
            <div class="weather-icon">${getWeatherIcon(data.current.weather_code)}</div>
            <div class="temperature">${Math.round(data.current.temperature_2m)}°C</div>
            <div class="weather-detail">
                <span>💨 Ветер</span>
                <span>${data.current.wind_speed_10m} км/ч</span>
            </div>
            <div class="weather-detail">
                <span>💧 Влажность</span>
                <span>${data.current.relative_humidity_2m}%</span>
            </div>
            <div class="weather-detail">
                <span>🌤️ Состояние</span>
                <span>${getWeatherDescription(data.current.weather_code)}</span>
            </div>
            <div class="time">🕐 ${new Date(data.current.time).toLocaleString()}</div>
        </div>
    `;
        }

        function getWeatherIcon(code: number): string {
            if (code === 0) return '☀️';
            if (code === 1 || code === 2) return '⛅';
            if (code === 3) return '☁️';
            if (code >= 51 && code <= 67) return '🌧️';
            if (code >= 71 && code <= 77) return '❄️';
            return '🌍';
        }

        function getWeatherDescription(code: number): string {
            if (code === 0) return 'Ясно';
            if (code === 1 || code === 2) return 'Переменная облачность';
            if (code === 3) return 'Пасмурно';
            if (code >= 51 && code <= 67) return 'Дождь';
            if (code >= 71 && code <= 77) return 'Снег';
            return 'Неизвестно';
        }
    }).catch(error => {
        console.error('Error weather', error);
    });


})



