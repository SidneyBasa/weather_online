// January 11 2023 @ 5:53pm

var fetch_button = document.querySelector('#fetch_button');
var city1 = document.querySelector('#city1');
var currentTemp = document.querySelector('#city-temp');
var currentHumidity = document.querySelector('#city-humidity');
var currentWindSpeed = document.querySelector('#city-wind-speed');
var currentWindDirection = document.querySelector('#city-wind-direction');
var cityName = document.querySelector('#city-name');


// Friday January 20, 2023 @ 6:25pm
var city_List = document.querySelector('#city-list');
var remove = document.querySelector('#remove_button');
var city_being_fetched = '';

let tempStore = false;
var city_count = 0;
var cityArray = [];

var getCityData = '';
console.log("Value of getCityData", getCityData)
// Create a maximum of 5 forecast cards
let cards_remaining = 4;

card_count = 0;
// console.log("Test of foreCast at line 11", foreCast)
// OpenWeather generated API key
var OpenWeatherAPIkey = "d8e37c6ab0ccb49462ecfa3903bde601";

var OpenWeatherDefaultKey = "280939f72184ff7f41f0df5fd40b05a6";

// console.log("test")

// Testing for input 
// Re-discovered event.preventDefault()
// function consoleTest(event) {
//     event.preventDefault();
// console.log("Test city1.value", city1.value)
// console.log("Test city1.value[1]", city1.value[1])
// console.log("Test city1.value.wind", city1.value.wind)
// console.log("Test city1.value.main.humidity", city1.value.main.humidity)
// console.log("Test city1.value.main.temp", city1.value.main.temp)
// }


function getApi() {
    
    if (getCityData != '')
    {
        console.log("Test if GetcityData responds if (getCityData != '')")
        city_being_fetched = getCityData
        console.log("Value of city_being_fetched at if statement", city_being_fetched)
        console.log("Value of getCityData at if statement", getCityData)
    }
    else
    {
        city_being_fetched = city1.value;
        console.log("Value of city_being_fetched at else statement", city_being_fetched)
    }

    // OpenWeather URL trial and error
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city_being_fetched + '&appid=' + OpenWeatherAPIkey + '&units=imperial'; 
                    // https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=imperial
                    // 'http://api.openweathermap.org/data/2.5/weather&appid={OpenWeatherAPIkey}';
                    // http://api.openweathermap.org/data/2.5/weather
                    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data)
        // console.log("data.name", data.name)
        // console.log("data.wind", data.wind)
        // console.log("data.wind.deg", data.wind.deg)
        // console.log("data.wind.deg", data.wind.speed)
        // console.log("data.main.temp", data.main.temp)
        // console.log('data.main.humidity', data.main.humidity)

        cityName.textContent = data.name;
        currentTemp.textContent = data.main.temp;
        currentHumidity.textContent = data.main.humidity;
        currentWindSpeed.textContent = data.wind.speed;
        currentWindDirection.textContent = data.wind.deg;

        // Pushing data that was taken from the fetch request
        createForecast(data);
        // city_count = city_count + 1;
        // Friday January 20, 2023 @ 7:09pm
        // Instantiating 3 new functions:
        // saveCitiesToLocalStorage()
        // getCitiesFromLocalStorage()
    });
}

// Wednesday January 18 2023 @ 3:55pm
// Creating new function to receive 5 day forecast
function createForecast(data)
{
    // console.log('Test for coordinates with data.coord', data.coord);
    // console.log('Test for coordinates data.coord.late', data.coord.lat);
    // console.log('Test for coordinates data.coord.lon', data.coord.lon);
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ data.coord.lat + '&lon=' + data.coord.lon + '&appid=' + OpenWeatherAPIkey + '&units=imperial';

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(forecasting){
        // Test for second data set: forecast
        // console.log("Test for forecast data set:", forecasting)

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
function createCity(data, forecasting) {

// day.js API Jan 18 2023 @ 6:39pm
var today = dayjs();
var current_date = today.format(' M/D/YYYY');
var current_time = today.format('h:mm:ss a');
// console.log("Test of day.js API function call, today's date:", current_date);
// console.log("Test of day.js API function call, current time:", current_time);

// Logic for the aside list
// console.log("data.name", data.name)
// console.log("Test if forecasting data within createCity function", forecasting)

// var cityList = document.getElementById("root");
var cityList = $('#city-list');

// Adding date from day.js next to city name
var cityDate = $('#city-date');


// Creating the date next to the city name
cityDate.text(current_date);


// Pushing data that was created in the functions above
create5day(data, forecasting, today);

}


// Friday January 20, 2023 @ 6:35pm
// Loads the aside list from the array in local storage 
function getCitiesFromLocalStorage() {

console.log("Test at get cities from local storage")
// Adding an attribute to the <li> being created

// Sunday January 22, 2023 @ 3:12pm
// Clearing the city buttons html list elements
clearCityButtons()

// Retrieve city array from local storage
cityArray = JSON.parse(localStorage.getItem("cityArray"));
console.log("Value of cityArray after getItem line 177", cityArray)

// Iterates through the cityArray that was refreshed when synchronizing with the local storage Cityarray
for (var i = 0; i < cityArray.length; i++) {
var citadel = cityArray[i];

// jQueryEquivalent of var city_List = document.querySelector('#city-list')
// Select the root ul with the ID city-list
var city_List = $('#city-list');
console.log("test at for loop")
console.log("Test at citadel", citadel)
// Friday January 20, 2023 @ 8:55pm, new includes method
// if (citadel.includes(city1.value))
// {
//     return;
// }
// else{
    console.log("value of cityArray.length", cityArray.length)
    if (cityArray.length == 0)
    {
        return;
    } else {
    // var city_number = city_count;
    console.log("Test at line 204 in get cities from local storage")
    // jQuery equivalent to var CityListed = document.createElement("li");
    var cityListed = $('<li>');

    // jQuery equivalent to cityListed.textContent = data.name;
    cityListed.text(citadel);

    // jQuery equivalent to cityListed.setAttribute("data-index", i)
    cityListed.attr('data-index', i);
    cityListed.attr('class', 'city_buttons')
    

    // cityList.append(cityListed);
    city_List.append(cityListed);
    // }
    }

}
}


// Sunday January 22, 2023 @ 3:12pm
// Clearing all the city buttons html list elements
function clearCityButtons() {
    // var cleanButton = $('#city-list');
    // console.log("Test of value at cleanButton", cleanButton)
    // console.log("Test of value cleanButton.children[1]", cleanButton.children[1])
    // console.log("Test of cleanButton.length", cleanButton.length)
    // console.log("Test of value at cleanButton.value", cleanButton.value)
    // var cityButtonRemove = $('data-index')
    // var cleanButtonRemove = document.getElementById("#data-index")
    // var cleanButtonRemove1 = document.getElementById("data-index.children[0]")
    // console.log("Test of data-index", cityButtonRemove)
    // console.log("Test of data-index.children[0]", cleanButtonRemove1)
    
    // Select all classes with the <li> list tag
    // const CityRemovalList = document.querySelectorAll("li")
    // const CityRemovalList = $('city-buttons')
    // var card1 = $('<li>')
    // const CityRemovalList = document.findElementByAttribute("data-index", "2")
    // console.log("Value of document.quertSelectorAll('li')", CityRemovalList)
    
    // remove method for all list items
    // cleanButton.remove(CityRemovalList);

    // January 22, 2023 @ 5:06pm Discovered jQuery method to remove() city buttons
    $('.city_buttons').remove();
}

// Adds a city to the cityArray 
// function addCityToAsideList () {
//     var city_List = $('#city-list');

    // Friday January 20, 2023 @ 8:55pm, new includes method
    // if (citadel.includes(city1.value))
    // {
    //     return;
    // }

    // console.log("Value of city_count", city_count)
    // else{
        // if (city_count > 0)
        // {
        
        // 
        // var city_number = city_count;
        // jQuery equivalent to var CityListed = document.createElement("li");
        // var cityListed = $('<li>');
    
        // jQuery equivalent to cityListed.textContent = data.name;
        // cityListed.text(city1.value);
    
        // jQuery equivalent to cityListed.setAttribute("data-index", i)
        // cityListed.attr('data-index', city_number);
        
        // Saturday January 21 2023 @ 7:50pm
        // Get local storage array
        // Modify local storage arrray
        // Set local storage array
        // var cityArray3 = JSON.parse(localStorage.getItem(cityArray));

        // cityList.append(cityListed);
        // city_List.append(cityListed);

        // cityArray = push(cityArray3);

        // localStorage.setItem("cityArray", JSON.stringify(cityArray));
        

        // console.log("Valuue of cityArray after append(cityArray3)")

        // }
        // saveCitiesToLocalStorage()
        city_count++
    
// }




// Friday January 20, 2023 @ 6:14pm
// The init function will run when the page loads
// This will initiate the generation of a list of cities that has been stored in local storage
function init() {
    
    // getCitiesFromLocalStorage()
    // Gets thes stored cities from local storage
    var storedCities = JSON.parse(localStorage.getItem("cityArray"));

    // If the city array was retrieved from the local storage, update the cityArray
    if (storedCities !== null) {
        cityArray = storedCities;
    }
    
    // Friday January 20, 2023 @ 6:51pm
    getCitiesFromLocalStorage()
    console.log("Test at init function")
    console.log("value of storedCities", storedCities)
    console.log("=======================================")
    console.log("")
}

// Friday January 20, 2023 @ 6:59pm
// Storing cities to the cityArray in local storage
function saveCitiesToLocalStorage() {
    localStorage.setItem("cityArray", JSON.stringify(cityArray));

    var cityText = city1.value.trim();
    console.log("Value at save cities to local storage, cityText", cityText)

    // Return the function if the city input is blank
    if (cityText === "") {
        return;
    }

    // Friday January 20, 2023 @ 8:48pm 
    // Check if the city is already in the array, if so, return
    // This is to prevent 2 Seattles from being stored
     if ( cityArray.includes(cityText))
     {
        return;
     }   
     else {
         // Array method push, adds the city to the end of the cityArray
        cityArray.push(cityText)
     
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
     }

     getCitiesFromLocalStorage()
    
    // This method clears the city input text
    // city1.value = "";
}

// This function removes the last city from the cityArray in local storage
function removeCityFromLocalStorage() {
    
    // Saturday January 21, 2023 @ 7:20pm 
    // Discovered the usage of JSON.stringify() and JSON.parse()
    // For local storage of arrays and objects
    // Reference located in Zoom recording, UW code bootcamp lecture Tuesday Jan 3, 2023

    // This method removes the entire cityArray
    // localStorage.removeItem("cityArray");

    // January 21, 2023 7:24pm, revising remove method to get array, modify then set array
    // In order to remove one city at a time
    var cityArray2 = JSON.parse(localStorage.getItem("cityArray"));
    console.log("Value of cityArray2 before pop from remove function", cityArray2)

    // Array method push, removes the city to the end of the cityArray
    cityArray2.pop()

    console.log("Value of cityArray2 after pop from remove function", cityArray2)
    // getCitiesFromLocalStorage();

    // Return modified array to local storage
    localStorage.setItem("cityArray", JSON.stringify(cityArray2))

    getCitiesFromLocalStorage()
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

    foreCastHeading.text(data.name + ' 5-Day Forecast:');

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

// fetch_button.addEventListener('click', consoleTest);

fetch_button.addEventListener('click', function(event) {
    event.preventDefault();
    saveCitiesToLocalStorage()
    getApi();
    // addCityToAsideList();
});


// Friday January 20, 2023 @ 6:26pm
city_List.addEventListener('click', function(event) {
    event.preventDefault();
    // Not sure what this does, but it's from module 4 APIs, activity 26
    var elements = event.target;
    console.log("Value of elements", elements)
    
    // Check if element is a list
    if (elements.matches("li") === true) {
        // Get the data-index value
        var index = elements.getAttribute("data-index");

        console.log("Value of index", index)
        // Friday January 20, 2023 @ 7:05pm
        // pause the following for testing

        getCityData = cityArray[index];
        console.log("Value of getCityData", getCityData)

        saveCitiesToLocalStorage()
        getApi()
    }
})

remove.addEventListener('click', function(event) {
    event.preventDefault();
    clearCityButtons()
    removeCityFromLocalStorage()
})

// This will call the init function to retrieve the cityArray and render the cities to the page
// Friday January 20, 2023 @ 6:19pm
init ()