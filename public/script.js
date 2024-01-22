let map;
let marker;

document.getElementById('city_form').addEventListener('submit', function (event) {
    event.preventDefault();

    const cityInput = document.getElementById('city');
    const cityName = cityInput.value;

    fetch(`/weather?city=${cityName}`)
        .then(response => response.json())
        .then(weatherData => {
           
            const temp = weatherData.temp;
            const weatherDesc = weatherData.description;
            const feels = weatherData.feelslike;
            const humidity = weatherData.humidity;
            const pressure = weatherData.pressure;
            const wspeed = weatherData.wspeed;
            const countryCode = weatherData.countryCode;
            const coordLon = weatherData.coordLon;
            const coordLat = weatherData.coordLat;
            const iconCode = weatherData.iconCode;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

            
            const tempElement = document.getElementById('cur-temp');
            const weatherDescElement = document.getElementById('weather-desc');
            const imgElement = document.getElementById('img_');
            const feelsElement = document.getElementById('feels');
            const humidityElement = document.getElementById('humidity');
            const pressureElement = document.getElementById('pressure');
            const wspeedElement = document.getElementById('wspeed');
            const countryCodeElement = document.getElementById('country-code');
            const coordLonElement = document.getElementById('coordinate-lon');
            const coordLatElement = document.getElementById('coordinate-lat');
            const mapElement = document.getElementById('map');

            tempElement.innerHTML = `<h6>Current temperature: ${temp}°C</h6>`;
            coordLonElement.innerHTML = `<h6>Lon: ${coordLon}°</h6>`
            coordLatElement.innerHTML = `<h6>Lat: ${coordLat}°</h6>`
            feelsElement.innerHTML = `<h6>Feels-like: ${feels}°C</h6>`
            humidityElement.innerHTML = `<h6 class="water">Humidity: ${humidity}% </h6>`
            pressureElement.innerHTML = `<h6 class="pressure">Pressure: ${pressure} mb</h6>`
            wspeedElement.innerHTML = `<h6 class="wind">Wind speed: ${wspeed} m/s</h6>`
            countryCodeElement.innerHTML = `<h6>Country Code: ${countryCode}</h6>`
            weatherDescElement.innerHTML = `<h6>Description: ${weatherDesc}</h6>`
            imgElement.setAttribute('src', iconUrl);

            const latitude = weatherData.coordLat;
            const longitude = weatherData.coordLon;

            displayMap(coordLat, coordLon, cityName);
            getNASAImage(latitude, longitude);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);

            const weatherElement = document.getElementById('city_name');
            const weatherDataElement = document.getElementById('cur_temp');

            weatherElement.innerHTML = '<p>Error fetching weather data.</p>';
            weatherDataElement.innerHTML = '';
        });
});

function displayMap(latitude, longitude, cityName) {
    if (!map) {
        map = L.map('map').setView([latitude, longitude], 10);


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }

    if (marker) {
        marker.remove();
    }

    marker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup(cityName)
        .openPopup();

    map.panTo([latitude, longitude]);
}

function getNASAImage(latitude, longitude) {
    const apiKey = 'BUzlc32hI3sOiPhJYdcCMZ2FSwt68hjjlX6VvP7s'; 
    const date = new Date().toISOString().split('T')[0]; 

    const apiUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=${date}&api_key=${apiKey}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.url;

            const nasaImageElement = document.getElementById('nasa-image');
            nasaImageElement.innerHTML = `<img src="${imageUrl}" alt="NASA Image">`;

            return imageUrl;
        })
        .catch(error => {
            console.error('Error fetching NASA image:', error);
        });
}


