// January 11 2023 @ 5:53pm

var fetch_button = document.querySelector('#fetch_button');
var city1 = document.querySelector('#city1');
var currentTemp = document.querySelector('#city-temp');
var currentHumidity = document.querySelector('#city-humidity');
var currentWindSpeed = document.querySelector('#city-wind-speed');
var currentWindDirection = document.querySelector('#city-wind-direction');
var cityName = document.querySelector('#city-name');


// OpenWeather generated API key
var OpenWeatherAPIkey = "d8e37c6ab0ccb49462ecfa3903bde601";

var OpenWeatherDefaultKey = "280939f72184ff7f41f0df5fd40b05a6";

console.log("test")

// Testing for input 
// Re-discovered event.preventDefault()
function consoleTest(event) {
    event.preventDefault();
// console.log("Test city1.value", city1.value)
// console.log("Test city1.value[1]", city1.value[1])
// console.log("Test city1.value.wind", city1.value.wind)
// console.log("Test city1.value.main.humidity", city1.value.main.humidity)
// console.log("Test city1.value.main.temp", city1.value.main.temp)
}

function getApi() {

    // OpenWeather URL trial and error
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city1.value + '&appid=' + OpenWeatherAPIkey + '&units=imperial'; 
                    // https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=imperial
                     
                    // 'http://api.openweathermap.org/data/2.5/weather&appid={OpenWeatherAPIkey}';
                    // http://api.openweathermap.org/data/2.5/weather
                    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        console.log("data.name", data.name)
        console.log("data.wind", data.wind)
        console.log("data.wind.deg", data.wind.deg)
        console.log("data.wind.deg", data.wind.speed)
        console.log("data.main.temp", data.main.temp)
        console.log('data.main.humidity', data.main.humidity)

        cityName.textContent = data.name;
        currentTemp.textContent = data.main.temp;
        currentHumidity.textContent = data.main.humidity;
        currentWindSpeed.textContent = data.wind.speed;
        currentWindDirection.textContent = data.wind.deg;
    });
}


fetch_button.addEventListener('click', consoleTest);

fetch_button.addEventListener('click', getApi);
