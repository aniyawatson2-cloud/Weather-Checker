const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');

const API_KEY = '4c8445d3a5a846ef700f5b5a023398a3';

searchBtn.addEventListener('click', function() {
    const cityName = cityInput.value;
    
    if (cityName === '') {
        weatherDisplay.textContent = 'Please enter a city name!';
        return;
    }
    
    weatherDisplay.textContent = 'Loading...';
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;
    
    // Fetch the weather data
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Check if city was found
            if (data.cod === '404') {
                weatherDisplay.textContent = 'City not found! Try again.';
                return;
            }
            
            // Display the weather information
            const temp = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            
            weatherDisplay.innerHTML = `
                <h2>${data.name}</h2>
                <p><strong>Temperature:</strong> ${temp}°F</p>
                <p><strong>Weather:</strong> ${description}</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} mph</p>
            `;
        })
        .catch(error => {
            weatherDisplay.textContent = 'Error fetching weather data. Please try again.';
            console.log('Error:', error);
        });
});