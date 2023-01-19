// January 11 2023 @ 5:53pm

var fetch_button = document.querySelector('#fetch_button');
var city1 = document.querySelector('#city1');
var currentTemp = document.querySelector('#city-temp');
var currentHumidity = document.querySelector('#city-humidity');
var currentWindSpeed = document.querySelector('#city-wind-speed');
var currentWindDirection = document.querySelector('#city-wind-direction');
var cityName = document.querySelector('#city-name');

let tempStore = false;

// Create a maximum of 5 forecast cards
let cards_remaining = 4;

card_count = 0;
// console.log("Test of foreCast at line 11", foreCast)
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

        // Pushing data that was taken from the fetch request
        createForecast(data);
    });
}

// Wednesday January 18 2023 @ 3:55pm
// Creating new function to receive 5 day forecast
function createForecast(data)
{
    // console.log('Test for coordinates with data.coord', data.coord);
    // console.log('Test for coordinates data.coord.late', data.coord.lat);
    // console.log('Test for coordinates data.coord.lon', data.coord.lon);
    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='+ data.coord.lat + '&lon=' + data.coord.lon + '&appid=' + OpenWeatherAPIkey + '&units=imperial';

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(forecasting){
        // Test for second data set: forecast
        console.log("Test for forecast data set:", forecasting)

        // var today = dayjs();
        // var current_date = today.format('M/D/YYYY');
        // var current_time = today.format('h:mm:ss a');
        // console.log("Test of day.js API function call, today's date:", current_date);
        // console.log("Test of day.js API function call, current time:", current_time);
        // console.log("Test of forecasting.list", forecasting.list)
        // console.log("Test of forecasting.list.dt", forecasting.list.dt)
        // console.log("Test of forecasting.list.dt_txt", forecasting.list.dt_txt)
        // console.log("Test of forecasting.list[0].dt_txt", forecasting.list[0].dt_txt)
    
        // Pushing data that was received from the 2 fetch requests above
        createCity(data, forecasting);
    })
    
    
}

// Tuesday January 17, 2023  @ 5:30pm
// Adding service side API jQuery
// To append data to the html document in leiu of JavaScript
// Comments are added for the vanilla JavaScript equivalents

// This function createCity creates the structure of the info box and populates it
// This function adds a list of cities for each input box submission
function createCity(data, forecasting) {

// day.js API Jan 18 2023 @ 6:39pm
var today = dayjs();
var current_date = today.format(' M/D/YYYY');
var current_time = today.format('h:mm:ss a');
console.log("Test of day.js API function call, today's date:", current_date);
console.log("Test of day.js API function call, current time:", current_time);

// Logic for the aside list
// console.log("data.name", data.name)
// console.log("Test if forecasting data within createCity function", forecasting)

// var cityList = document.getElementById("root");
var cityList = $('#city-list');

// Adding date from day.js next to city name
var cityDate = $('#city-date');

// var cityListed = document.createElement("<ul>");
var cityListed = $('<li>');

// cityListed.textContent = data.name;
cityListed.text(data.name);

// Creating the date next to the city name
cityDate.text(current_date);

// cityList.append(cityListed);
cityList.append(cityListed);

// Pushing data that was created in the functions above
create5day(data, forecasting, today);

}

// This function creates the 5 day forecast structure
function create5day(data, forecasting, today) {

// Reference:
// The address to the forecast container
// console.log("value of document.children[0].children[1].children[1].children[2]", document.children[0].children[1].children[1].children[2])

// The address to the first card
// console.log("value of document.children[0].children[1].children[1].children[2].children[1]", document.children[0].children[1].children[1].children[2].children[1])


    // Creating if statement so that the 5 day forecast structure builds once
    // 5-Day Forecast heading
    // Creating if statement so that the heading occurs once
    if (tempStore == false)
    {

    tempStore = true;

    var foreCast = $('#forecast');

    var foreCastHeading = $('<h2>');

    foreCastHeading.text('5-Day Forecast:');

    // console.log("Test of foreCast", foreCast)
    // console.log("Test of foreCast[0]", foreCast[0]);
    // console.log("Test of foreCast", foreCast);
    foreCast.append(foreCastHeading);

    // logic for the 5 day forecast array
    // January 18 2023
    for (var i = 0; i < 5; i++)
    {
    // var date1 = today.format(' M/' + 'D' + i +'/YYYY');
    // console.log("Test of forecasting at line 175", forecasting)
    // console.log("Test of forecasting.list[0] at line 175", forecasting.list[0])
    // console.log("Test of forecasting.list[0].main.temp at line 175", forecasting.list[0].main.temp)

    // Select the root div with the ID forecast
    var foreCast = $('#forecast');

    // The blue box that contains one forecasted day
    var card1 = $('<div>')
    
    // The div that was just created is given the class of card1 for styling
    card1.attr('class', 'card1');
    // Adding an id to the div that was just created above
    card1.attr('id', 'card' + i )
    // Adding this card to the document
    foreCast.append(card1);

    // Selecting the current ID of the <div> with the class of card that was just created
    var select_card = $('#card' + i);

    
    // Creating a new div within the card ID selected above to store the date
    var date_card = $('<div>');
    // creating a new div within the card ID selected above to store the temperature
    var temp_card = $('<div>');
    // Creating new wind div
    var wind_card = $('<div>');
    // Creating new humidity div
    var hum_card = $('<div>');

    // Assigning ID's to the two divs created above
    date_card.attr('id', 'date_card' + i);
    temp_card.attr('id', '_temp' + i);
    wind_card.attr('id', '_wind' + i);
    hum_card.attr('id', '_hum' + i);

    // temp_card.text('')
    // Appending this new div to the card ID selected above
    select_card.append(date_card);
    select_card.append(temp_card);
    select_card.append(wind_card);
    select_card.append(hum_card);

    // var temp_card2 = $('#_temp' + i)
    // temp_card2.text('Test')
    // select_card.text(new_date);

    // for loop counter for 5 cards
    card_count++;

    }

}
    // Pushing data that was created in the functions above
    populateForecast(data, forecasting, today)

    
}


// This function populates the 5 day forecast
function populateForecast(data, forecasting, today) {


for (var i = 0; i < 5; i++){

    // Select one of the 5 day forecast cards
    var select_card = $('#date_card' + i);

    // Research needed to modify date
    // Discovered add function for date.js API  
    var b = today.add(i, 'day');
    var new_date = b.format('M/D/YYYY')

    // Add the date to the selected card
    select_card.text(new_date);

    // Adding temperature per forecasted day
    var avg_temp = forecasting.list[i * 7].main.temp;
    // Adding wind speed per forecasted day
    var windForecasted = forecasting.list[i * 7].wind.speed;
    // Adding humidity per forecasted day
    var humForecasted = forecasting.list[i * 7].main.humidity; 
    
    // console.log("avg_temp forecasted: ", avg_temp )
    // console.log("Wind forecasted: ", windForecasted )
    // console.log("Humidity forecasted", humForecasted)

    var temp_card = $('#_temp' + i);
    var wind_card = $('#_wind' + i);
    var hum_card = $('#_hum' + i);

    temp_card.text('Temp: ' + avg_temp + ' °F');
    wind_card.text('Wind: ' + windForecasted + ' MPH');
    hum_card.text('Humidity: ' + humForecasted + ' %');

    }
}

// fetch_button.addEventListener('click', createCity);

fetch_button.addEventListener('click', consoleTest);

fetch_button.addEventListener('click', getApi);
