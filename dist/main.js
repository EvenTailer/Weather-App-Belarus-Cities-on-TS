import { fetchWeather, fetchDailyForecast } from "./core/weatherServise.js";
const coords = {
    vitebsk: { latitude: 55.1904, longitude: 30.2049 },
    minsk: { latitude: 53.9, longitude: 27.5667 },
    gomel: { latitude: 52.4345, longitude: 30.9754 },
    mogilev: { latitude: 53.9168, longitude: 30.3449 },
    grodno: { latitude: 53.6884, longitude: 23.8258 },
    brest: { latitude: 52.0975, longitude: 23.6877 },
};
const cityNames = {
    vitebsk: 'Витебск',
    minsk: 'Минск',
    gomel: 'Гомель',
    mogilev: 'Могилёв',
    grodno: 'Гродно',
    brest: 'Брест'
};
const showWeather = document.getElementById('showInfoWeather');
const select = document.getElementById('cities');
if (select) {
    let optionsHtml = '<option value="">-- Выберите город --</option>';
    Object.keys(coords).forEach(cityKey => {
        optionsHtml += `<option value="${cityKey}">${cityNames[cityKey]}</option>`;
    });
    select.innerHTML = optionsHtml;
}
function getWeatherIcon(code) {
    if (code === 0)
        return '☀️';
    if (code === 1 || code === 2)
        return '⛅';
    if (code === 3)
        return '☁️';
    if (code >= 51 && code <= 67)
        return '🌧️';
    if (code >= 71 && code <= 77)
        return '❄️';
    return '🌍';
}
function getWeatherDescription(code) {
    if (code === 0)
        return 'Ясно';
    if (code === 1 || code === 2)
        return 'Переменная облачность';
    if (code === 3)
        return 'Пасмурно';
    if (code >= 51 && code <= 67)
        return 'Дождь';
    if (code >= 71 && code <= 77)
        return 'Снег';
    return 'Неизвестно';
}
// select?.addEventListener('change', (event) => {
//     const target = event.target as HTMLSelectElement;
//     const selectedCityKey = target.value;
//     const cityCoords = coords[selectedCityKey as keyof typeof coords];
//     const cityName = cityNames[selectedCityKey];
//     fetchWeather(cityCoords).then(data => {
//         if (showWeather) {
//             showWeather.innerHTML = `
//         <div class="weather-card">
//             <div class= "city-name">${cityName}</div>
//             <div class="weather-icon">${getWeatherIcon(data.current.weather_code)}</div>
//             <div class="temperature">${Math.round(data.current.temperature_2m)}°C<br> <p class="feeling">Ощущается как ${data.current.apparent_temperature}°C</p></div>
//             <div class="weather-detail">
//                 <span>💨 Ветер</span>
//                 <span>${data.current.wind_speed_10m} км/ч</span>
//             </div>
//             <div class="weather-detail">
//                 <span>💧 Влажность</span>
//                 <span>${data.current.relative_humidity_2m}%</span>
//             </div>
//             <div class="weather-detail">
//                 <span>🌤️ Состояние</span>
//                 <span>${getWeatherDescription(data.current.weather_code)}</span>
//             </div>
//             <div class="time">🕐 ${new Date(data.current.time).toLocaleString()}</div>
//         </div>
//     `;
//         }
//         return fetchDailyForecast(cityCoords);
//     }).then(dailyData => {
//         const tomorrowTempMax = Math.round(dailyData.temperature_2m_max[1]);
//         const tomorrowTempMin = Math.round(dailyData.temperature_2m_min[1]);
//         const tomorrowFeelMax = Math.round(dailyData.apparent_temperature_max[1]);
//         const tomorrowFeelMin = Math.round(dailyData.apparent_temperature_min[1]);
//         const tomorrowRainProb = dailyData.precipitation_probability_mean[1];
//         const tomorrowWeatherCode = dailyData.weather_code[1];
//         const dateToomorow = dailyData.time[1].split('-').reverse().join('.');
//         const toomorowHTML = `
//             <div class="forecast-card">
//             <div class= "city-name">${cityName}</div>
//             <div class="forecast-title">📅 Завтра, ${dateToomorow}</div>
//             <div class="forecast-temp">
//             🌡️ ${tomorrowTempMax}°C / ${tomorrowTempMin}°C
//             </div>
//             <div class="forecast-feel">
//             🌡️ Ощущается: ${tomorrowFeelMax}°C / ${tomorrowFeelMin}°C
//             </div>
//             <div class="forecast-rain">
//             💧 Вероятность осадков: ${tomorrowRainProb}%
//             </div>
//             <div class="forecast-icon">
//             ${getWeatherIcon(tomorrowWeatherCode)}
//             </div>
//             <div class="weather-detail">
//                 <span>🌤️ Состояние</span>
//                 <span>${getWeatherDescription(tomorrowWeatherCode)}</span>
//             </div>
//             </div>`
//         if (showWeather) {
//             console.log('Пытаюсь вставить прогноз:', toomorowHTML);
//             showWeather.insertAdjacentHTML('beforeend', toomorowHTML);
//             console.log('После вставки, содержимое showWeather:', showWeather.innerHTML);
//         }
//     }).catch(error => {
//         console.error('Error weather', error);
//     });
// })
// select?.addEventListener('change', (event) => {
//     const target = event.target as HTMLSelectElement;
//     const selectedCityKey = target.value;
//     if (!selectedCityKey) return;
//     const cityCoords = coords[selectedCityKey as keyof typeof coords];
//     const cityName = cityNames[selectedCityKey];
//     // Запрашиваем оба данных параллельно
//     Promise.all([
//         fetchWeather(cityCoords),
//         fetchDailyForecast(cityCoords)
//     ]).then(([data, dailyData]) => {
//         // Данные для прогноза
//         const tomorrowTempMax = Math.round(dailyData.temperature_2m_max[1]);
//         const tomorrowTempMin = Math.round(dailyData.temperature_2m_min[1]);
//         const tomorrowFeelMax = Math.round(dailyData.apparent_temperature_max[1]);
//         const tomorrowFeelMin = Math.round(dailyData.apparent_temperature_min[1]);
//         const tomorrowRainProb = dailyData.precipitation_probability_mean[1];
//         const tomorrowWeatherCode = dailyData.weather_code[1];
//         const dateTomorrow = dailyData.time[1].split('-').reverse().join('.');
//         if (showWeather) {
//             // Вставляем обе карточки вместе в flex-контейнер
//             showWeather.innerHTML = `
//                 <div class="two-columns">
//                     <!-- Карточка текущей погоды (слева) -->
//                     <div class="weather-card">
//                         <div class="city-name">${cityName}</div>
//                         <div class="weather-icon">${getWeatherIcon(data.current.weather_code)}</div>
//                         <div class="temperature">${Math.round(data.current.temperature_2m)}°C<br> <p class="feeling">Ощущается как ${Math.round(data.current.apparent_temperature)}°C</p></div>
//                         <div class="weather-detail">
//                             <span>💨 Ветер</span>
//                             <span>${data.current.wind_speed_10m} км/ч</span>
//                         </div>
//                         <div class="weather-detail">
//                             <span>💧 Влажность</span>
//                             <span>${data.current.relative_humidity_2m}%</span>
//                         </div>
//                         <div class="weather-detail">
//                             <span>🌤️ Состояние</span>
//                             <span>${getWeatherDescription(data.current.weather_code)}</span>
//                         </div>
//                         <div class="time">🕐 ${new Date(data.current.time).toLocaleString()}</div>
//                     </div>
//                     <!-- Карточка прогноза (справа) -->
//                     <div class="forecast-card">
//                         <div class="city-name">${cityName}</div>
//                         <div class="forecast-title">📅 Завтра, ${dateTomorrow}</div>
//                         <div class="forecast-temp">🌡️ ${tomorrowTempMax}°C / ${tomorrowTempMin}°C</div>
//                         <div class="forecast-feel">🌡️ Ощущается: ${tomorrowFeelMax}°C / ${tomorrowFeelMin}°C</div>
//                         <div class="forecast-rain">💧 Вероятность осадков: ${tomorrowRainProb}%</div>
//                         <div class="forecast-icon">${getWeatherIcon(tomorrowWeatherCode)}</div>
//                         <div class="weather-detail">
//                             <span>🌤️ Состояние</span>
//                             <span>${getWeatherDescription(tomorrowWeatherCode)}</span>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         }
//     }).catch(error => {
//         console.error('Error weather', error);
//         if (showWeather) {
//             showWeather.innerHTML = `<div class="weather-card"><p style="color:white;">Ошибка загрузки погоды</p></div>`;
//         }
//     });
// });
select?.addEventListener('change', async (event) => {
    const target = event.target;
    const selectedCityKey = target.value;
    if (!selectedCityKey)
        return;
    const cityCoords = coords[selectedCityKey];
    const cityName = cityNames[selectedCityKey];
    try {
        const [data, dailyData] = await Promise.all([
            fetchWeather(cityCoords),
            fetchDailyForecast(cityCoords)
        ]);
        const dateTomorrow = dailyData.time[1].split('-').reverse().join('.');
        // Находим TWO-COLUMNS (он уже есть в HTML)
        const twoColumns = document.querySelector('.two-columns');
        if (twoColumns) {
            twoColumns.innerHTML = `
                <div class="weather-card">
                    <div class="city-name">${cityName}</div>
                    <div class="weather-icon">${getWeatherIcon(data.current.weather_code)}</div>
                    <div class="temperature">${Math.round(data.current.temperature_2m)}°C</div>
                    <div class="feeling">Ощущается как ${Math.round(data.current.apparent_temperature)}°C</div>
                    <div class="weather-detail"><span>💨 Ветер</span><span>${data.current.wind_speed_10m} км/ч</span></div>
                    <div class="weather-detail"><span>💧 Влажность</span><span>${data.current.relative_humidity_2m}%</span></div>
                    <div class="weather-detail"><span>🌤️ Состояние</span><span>${getWeatherDescription(data.current.weather_code)}</span></div>
                    <div class="time">🕐 ${new Date(data.current.time).toLocaleString()}</div>
                </div>
                <div class="forecast-card">
                    <div class="city-name">${cityName}</div>
                    <div class="forecast-title">📅 Завтра, ${dateTomorrow}</div>
                    <div class="forecast-temp">🌡️ ${Math.round(dailyData.temperature_2m_max[1])}°C / ${Math.round(dailyData.temperature_2m_min[1])}°C</div>
                    <div class="forecast-feel">🌡️ Ощущается: ${Math.round(dailyData.apparent_temperature_max[1])}°C / ${Math.round(dailyData.apparent_temperature_min[1])}°C</div>
                    <div class="forecast-rain">💧 Вероятность осадков: ${dailyData.precipitation_probability_mean[1]}%</div>
                    <div class="forecast-icon">${getWeatherIcon(dailyData.weather_code[1])}</div>
                    <div class="weather-detail"><span>🌤️ Состояние</span><span>${getWeatherDescription(dailyData.weather_code[1])}</span></div>
                </div>
            `;
        }
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
});
