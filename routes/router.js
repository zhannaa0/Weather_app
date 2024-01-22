const express = require('express')
const router = express.Router()
const https = require('https')

router.get('/', (req, res) => {
    const query = req.query.city;
    const apiKey = 'd178007c8e6d1a3bcd4d9b05c533326d';
    const unit = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

    https.get(url, (response) => {
        console.log(url);
        console.log(response.statusCode);

        if (response.statusCode !== 200) {
            res.status(response.statusCode).json({ error: 'Error fetching weather data' });
            return;
        }

        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            console.log(weatherData)

            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const feels = weatherData.main.feels_like
            const humidity = weatherData.main.humidity
            const pressure = weatherData.main.pressure
            const wspeed = weatherData.wind.speed
            const countryCode = weatherData.sys.id
            const coordLon = weatherData.coord.lon
            const coordLat = weatherData.coord.lat
            const iconCode = weatherData.weather[0].icon
            const cityName = weatherData.name
            
            
            
            const responseData = {
                temp: temp,
                description: weatherDesc,
                feelslike: feels,
                humidity: humidity,
                pressure: pressure,
                wspeed: wspeed,
                countryCode: countryCode,
                coordLat: coordLat,
                coordLon: coordLon,
                iconCode: iconCode,
                cityName: cityName

            };

            res.json(responseData);
        });
    }).on('error', (error) => {
        console.error('Error making API request:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
});


module.exports = router
