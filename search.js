var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var queryString = document.location.search;
var search = queryString.split('=')[1];
var today = moment().format("MMM Do, YYYY");

console.log(document.location.search);


var searchApiCurrentWeather = function () {
    
    console.log(search);

//current weather api
    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var apiKey = '&appid=37514b3f804f97bb2acef73bc031277e'
   
    var apiUrl = locQueryUrl + search + "&units=imperial" + apiKey;
  
    console.log(apiUrl);

    resultTextEl.textContent = search;

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
      console.log(data.weather[0].main);
      console.log(data.main.temp);
      console.log(data.main.humidity);
      console.log(data.wind.speed);



 
  displayCurrentWeather(data.weather[0].main, data.main.temp, data.main.humidity, data.wind.speed);

});
}
 


//display results
function displayCurrentWeather(currentWeather, temperature, humidity, windSpeed ) {
   
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    var titleEl = document.createElement('h3');
    titleEl.textContent = "Current weather in " + search;
  
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

    resultBody.append(titleEl, dateEl, currentWeatherEl, tempEl, humidityEl, windEl);
  
    resultContentEl.append(resultCard);

};

//second search
function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;
    var formatInputVal = document.querySelector('#format-input').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    searchApi(searchInputVal, formatInputVal);
  }
  

$(".second-search").on('click', function(event) {

    event.preventDefault();


})

searchApiCurrentWeather();

