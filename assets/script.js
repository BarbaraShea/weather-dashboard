var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var today = moment().format("MMM Do, YYYY");
var locQueryUrl = 'https://api.openweathermap.org/data/2.5/';
var apiKey = "&appid=37514b3f804f97bb2acef73bc031277e";
var currentPicEl = document.querySelector('#current-pic');
var searchArray=[];
var cityName = document.querySelector("#textInput");
var searchHistoryEl = document.querySelector("#searchHistory");
var forecastEl = document.querySelector(".forecast");


//search

$(".search").on('click', function(event) {
  
  console.log(cityName.value);

  event.preventDefault();
  
  for (var i = 0; i < searchArray.length; i++) {
    var searchEl = document.createElement('li');
    var previousSearch = searchArray[i];
    searchEl.innerHTML = searchArray[i];
    searchHistoryEl.append(searchEl);
    searchEl.addEventListener("click",function() {
      searchApiCurrentWeather(previousSearch);
      getForecast(previousSearch);
  })
    searchArray.splice(searchArray[0]);
  }

  getForecast(cityName.value);
  searchApiCurrentWeather(cityName.value);
  searchHistory();

});

//function to search current weather
function searchApiCurrentWeather(cityName) {
    
   var apiUrl = locQueryUrl + "weather?q=" + cityName + "&units=imperial" + apiKey;
  
    console.log(apiUrl);

    resultTextEl.textContent = cityName;

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
 
  displayCurrentWeather(data.weather[0].main, data.main.temp, data.main.humidity, data.wind.speed, data.weather[0].icon);

});
}
 

//display results
function displayCurrentWeather(currentWeather, temperature, humidity, windSpeed, weatherPic ) {
   
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'mainCard', 'mb-3', 'p-0', 'w-100%');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    var currentWeatherPic = new Image(100, 200);
    currentWeatherPic.src = "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png";
    resultBody.append(currentWeatherPic);
    
    var dateEl = document.createElement('p');
    dateEl.innerHTML = '<strong>Date: </strong> ' + today + '<br/>';
    
    var currentWeatherEl = document.createElement('p');
    currentWeatherEl.innerHTML = "<strong>Current conditions: </strong>"  + currentWeather;
    
    var tempEl = document.createElement('p');
    tempEl.innerHTML = "<strong>Current temperature: </strong>" + temperature + " degrees";

    var humidityEl = document.createElement('p');
    humidityEl.innerHTML = "<strong>Humidity: </strong>" + humidity + " %";

    var windEl = document.createElement('p');
    windEl.innerHTML = "<strong>Wind: </strong>" + windSpeed + " mph";

    resultBody.append(dateEl, currentWeatherEl, tempEl, humidityEl, windEl);
  
    resultContentEl.innerHTML="";
    resultContentEl.append(resultCard);

};

// //five day forcaset
function getForecast(cityName){
var apiUrl = locQueryUrl + "forecast?q=" + cityName + "&units=imperial" + apiKey;

forecastEl.innerHTML="";

  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (i = 0; i != data.list.length; i+=8){

 createForecastCards(data.list[i].dt_txt, data.list[i].weather[0].icon, data.list[i].main.temp, data.list[i].main.humidity )
};
});
};
// save search history
function searchHistory() {

var searchHistory = cityName.value;

searchArray.push(searchHistory);

localStorage.setItem("search-history", JSON.stringify(searchArray));

}
// get items 

function getItems() {

  if (!localStorage.getItem("search-history")){
    localStorage.setItem("search-history", JSON.stringify(searchArray))
  }
  
};

//creates 5 day forecast cards
function createForecastCards(date, icon, temp, humidity) {
  
  var forecastDiv = document.createElement('div');

  var cardDate = document.createElement('h3');
  var cardIcon = new Image(40, 80);
  var cardTemp = document.createElement('p');
  var cardHumidity = document.createElement('p');

  cardDate.innerHTML = "Date:" + moment(date).format("MMM Do, YYYY");
  cardTemp.innerHTML = "Temperature: " + temp + "degrees"
  cardIcon.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  cardHumidity.innerHTML = "<strong>Humidity: </strong>" + humidity + " %";

  forecastDiv.append(cardDate, cardIcon, cardTemp, cardHumidity);
  
  forecastEl.append(forecastDiv);
}


getItems(); 