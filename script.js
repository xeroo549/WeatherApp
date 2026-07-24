addEventListener('DOMContentLoaded', function() {
    const api_key = '2f54a48f53371a78074c309091d89f49'
    let city_name = document.querySelector('#cityName');
    let temperature = document.querySelector('#temperature');
    let description = document.querySelector('#description');
    let humidity = document.querySelector('#humidity');
    let wind = document.querySelector('#wind');
    let search_bar = document.querySelector('#city');
    let search_button = document.querySelector('#searchBtn');

    let current_lat = 0
    let current_lon = 0

    async function fetchWeatherData(lat, lon) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`);
        const data = await response.json();
        

        city_name.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind: ${data.wind.speed} m/s`;
    }
    
    async function fetchCityCoords() {
        let city = search_bar.value;
        search_bar.value = '';
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`);
        const data = await response.json();
        current_lat = data[0].lat;
        current_lon = data[0].lon;
    }
    
    search_button.addEventListener('click', async function() {
        gtag('event', 'search_weather_btn')
        await fetchCityCoords();
        await fetchWeatherData(current_lat, current_lon);
    });
    
});