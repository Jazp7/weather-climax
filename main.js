// --- STATE MANAGEMENT ---
let currentUnits = { temperature: "celsius", wind: "kmh", precipitation: "mm" };
let currentLocation = {};
let lastFetchedData = {};
let selectedDay = 'today';
let debounceTimer;

// --- DOM Element Selection ---
const searchInput = document.querySelector(".search-input");
const searchSuggestionsEl = document.querySelector(".search-suggestions");
const mainContentEl = document.querySelector(".main-content"); // Needed for loading class

const dropdownMenu = document.querySelector(".dropdown-menu");
const daySelector = document.querySelector(".day-selector");
const currentTempEl = document.querySelector(".current-temp");
const currentWeatherSummaryEl = document.querySelector(".current-weather-summary");
const currentLocationEl = document.querySelector(".current-location");
const currentDateEl = document.querySelector(".current-date");
const currentWeatherIconEl = document.querySelector(".current-weather-icon");
const feelsLikeEl = document.querySelector(".detail-item:nth-child(1) .detail-value");
const humidityEl = document.querySelector(".detail-item:nth-child(2) .detail-value");
const windEl = document.querySelector(".detail-item:nth-child(3) .detail-value");
const precipitationEl = document.querySelector(".detail-item:nth-child(4) .detail-value");
const dailyForecastListEl = document.querySelector(".daily-forecast-list");
const hourlyForecastListEl = document.querySelector(".hourly-forecast-list");
const unitsToggleBtn = document.querySelector(".units-toggle");

// --- Mappers & Helpers ---
function getWeatherInfo(weatherCode) {
    const weatherMap = { 
        0: { description: "Clear sky", icon: "icon-sunny.webp" }, 
        1: { description: "Mainly clear", icon: "icon-partly-cloudy.webp" }, 
        2: { description: "Partly cloudy", icon: "icon-partly-cloudy.webp" }, 
        3: { description: "Overcast", icon: "icon-overcast.webp" }, 
        45: { description: "Fog", icon: "icon-fog.webp" }, 
        48: { description: "Depositing rime fog", icon: "icon-fog.webp" }, 
        51: { description: "Light drizzle", icon: "icon-drizzle.webp" }, 
        53: { description: "Moderate drizzle", icon: "icon-drizzle.webp" }, 
        55: { description: "Dense drizzle", icon: "icon-drizzle.webp" }, 
        61: { description: "Slight rain", icon: "icon-rain.webp" }, 
        63: { description: "Moderate rain", icon: "icon-rain.webp" }, 
        65: { description: "Heavy rain", icon: "icon-rain.webp" }, 
        71: { description: "Slight snow fall", icon: "icon-snow.webp" }, 
        73: { description: "Moderate snow fall", icon: "icon-snow.webp" }, 
        75: { description: "Heavy snow fall", icon: "icon-snow.webp" }, 
        80: { description: "Slight rain showers", icon: "icon-rain.webp" }, 
        81: { description: "Moderate rain showers", icon: "icon-rain.webp" }, 
        82: { description: "Violent rain showers", icon: "icon-rain.webp" }, 
        95: { description: "Thunderstorm", icon: "icon-storm.webp" } 
    };

    return weatherMap[weatherCode] || { description: "Unknown", icon: "icon-error.svg" };
}

// --- Update UI Functions ---
function updateCurrentWeather(weatherData, locationData, units) { /* ... same as before ... */ }
function updateDailyForecast(dailyData) { /* ... same as before ... */ }
function updateHourlyForecast(hourlyData, day) { /* ... same as before ... */ }
// Note: For brevity, the bodies of the update functions are omitted here, but they are the same as in the previous version.

// --- API Fetching ---
async function getCoordinates(cityName, count = 1) {
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=${count}`;
    try {
        const response = await fetch(geocodingUrl);
        if (!response.ok) throw new Error("Geocoding API call failed");
        const data = await response.json();
        return data.results || [];
    } catch (error) { console.error("Geocoding Error:", error); return []; }
}

async function fetchWeather(latitude, longitude, units) { /* ... same as before ... */ }

// --- Main Application Flow ---
async function fetchAndDisplayWeather(locationData, units) {
    document.body.classList.add('is-loading');
    const weatherData = await fetchWeather(locationData.latitude, locationData.longitude, units);
    if (weatherData) {
        lastFetchedData = weatherData;
        updateCurrentWeather(weatherData, locationData, units);
        updateDailyForecast(weatherData.daily);
        updateHourlyForecast(weatherData.hourly, selectedDay);
    }
    document.body.classList.remove('is-loading');
}

// --- Event Handlers ---
function handleSuggestionClick(location) {
    currentLocation = location;
    fetchAndDisplayWeather(currentLocation, currentUnits);
    searchSuggestionsEl.classList.remove('active');
    searchSuggestionsEl.innerHTML = '';
    searchInput.value = `${location.name}, ${location.country}`;
}

async function handleSearchInput() {
    const query = searchInput.value.trim();
    if (query.length < 3) {
        searchSuggestionsEl.classList.remove('active');
        searchSuggestionsEl.innerHTML = '';
        return;
    }

    const suggestions = await getCoordinates(query, 5);
    searchSuggestionsEl.innerHTML = '';
    if (suggestions.length > 0) {
        suggestions.forEach(location => {
            const item = document.createElement('li');
            item.className = 'suggestion-item';
            item.textContent = `${location.name}, ${location.country}`;
            item.onclick = () => handleSuggestionClick(location);
            searchSuggestionsEl.appendChild(item);
        });
        searchSuggestionsEl.classList.add('active');
    } else {
        searchSuggestionsEl.classList.remove('active');
    }
}

function handleUnitChange(e) { /* ... same as before ... */ }
function handleDayChange(e) { /* ... same as before ... */ }

async function initialLoad(defaultCity = "New York") {
    const locations = await getCoordinates(defaultCity);
    if (locations.length > 0) {
        currentLocation = locations[0];
        fetchAndDisplayWeather(currentLocation, currentUnits);
        searchInput.value = `${currentLocation.name}, ${currentLocation.country}`;
    }
}

// --- Event Listeners ---
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(handleSearchInput, 300); // Debounce API calls
});
dropdownMenu.addEventListener("change", handleUnitChange);
daySelector.addEventListener("click", handleDayChange);
unitsToggleBtn.addEventListener("click", () => dropdownMenu.classList.toggle("active"));
document.addEventListener('DOMContentLoaded', () => initialLoad());

// Re-add full function bodies that were omitted for brevity
function updateCurrentWeather(weatherData, locationData, units) {
    const { apparent_temperature, precipitation, relative_humidity_2m, temperature_2m, weather_code, wind_speed_10m } = weatherData.current;
    const weatherInfo = getWeatherInfo(weather_code);
    currentTempEl.textContent = `${Math.round(temperature_2m)}°`;
    currentWeatherSummaryEl.textContent = weatherInfo.description;
    currentWeatherIconEl.src = `./assets/images/${weatherInfo.icon}`;
    currentWeatherIconEl.alt = weatherInfo.description;
    currentLocationEl.textContent = `${locationData.name}, ${locationData.country}`;
    currentDateEl.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    feelsLikeEl.textContent = `${Math.round(apparent_temperature)}°`;
    humidityEl.textContent = `${relative_humidity_2m}%`;
    windEl.textContent = `${Math.round(wind_speed_10m)} ${units.wind}`;
    precipitationEl.textContent = `${precipitation} ${units.precipitation}`;
}

function updateDailyForecast(dailyData) {
    dailyForecastListEl.innerHTML = "";
    for (let i = 1; i < dailyData.time.length; i++) {
        const date = new Date(dailyData.time[i]);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const weatherInfo = getWeatherInfo(dailyData.weather_code[i]);
        const maxTemp = Math.round(dailyData.temperature_2m_max[i]);
        const minTemp = Math.round(dailyData.temperature_2m_min[i]);
        const cardHTML = `<li class="day-card"><p class="day-name">${dayName}</p><img src="./assets/images/${weatherInfo.icon}" alt="${weatherInfo.description}" class="day-icon"><p class="day-temp">${maxTemp}° / ${minTemp}°</p></li>`;
        dailyForecastListEl.innerHTML += cardHTML;
    }
}

function updateHourlyForecast(hourlyData, day) {
    hourlyForecastListEl.innerHTML = "";
    let startIndex = 0;
    if (day === 'today') {
        const currentHour = new Date().getHours();
        startIndex = hourlyData.time.findIndex(timeStr => new Date(timeStr).getHours() >= currentHour);
    } else if (day === 'tomorrow') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowISO = tomorrow.toISOString().split('T')[0];
        startIndex = hourlyData.time.findIndex(timeStr => timeStr.startsWith(tomorrowISO));
    }

    for (let i = startIndex; i < startIndex + 12; i++) {
        if (i >= hourlyData.time.length) break;
        const date = new Date(hourlyData.time[i]);
        const hour = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
        const weatherInfo = getWeatherInfo(hourlyData.weather_code[i]);
        const temp = Math.round(hourlyData.temperature_2m[i]);
        const cardHTML = `<li class="hour-card"><img src="./assets/images/${weatherInfo.icon}" alt="${weatherInfo.description}" class="hour-icon"><p class="hour-time">${hour}</p><p class="hour-temp">${temp}°</p></li>`;
        hourlyForecastListEl.innerHTML += cardHTML;
    }
}

async function fetchWeather(latitude, longitude, units) {
    const precipUnit = units.precipitation === 'in' ? 'inch' : 'mm';
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${units.temperature}&wind_speed_unit=${units.wind}&precipitation_unit=${precipUnit}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Weather API call failed`);
        return await response.json();
    } catch (error) { console.error("Weather Fetching Error:", error); }
}

function handleUnitChange(e) {
    if (e.target.type !== 'radio') return;
    const unitType = e.target.name;
    const unitValue = e.target.id;
    if (unitType === 'temperature') currentUnits.temperature = unitValue;
    if (unitType === 'wind') currentUnits.wind = unitValue;
    if (unitType === 'precipitation') currentUnits.precipitation = unitValue;
    fetchAndDisplayWeather(currentLocation, currentUnits);
}

function handleDayChange(e) {
    if (!e.target.classList.contains('day-tab')) return;
    const newSelectedDay = e.target.textContent.toLowerCase();
    if (newSelectedDay === selectedDay) return;
    selectedDay = newSelectedDay;
    daySelector.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
    updateHourlyForecast(lastFetchedData.hourly, selectedDay);
}