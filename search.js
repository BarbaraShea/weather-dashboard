console.log(document.location.search);

var getFeaturedSearch = function () {
    var queryString = document.location.search;
    var search = queryString.split('=')[1];

    console.log(search);

    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    var apiKey = '&appid=37514b3f804f97bb2acef73bc031277e'
   
    var apiUrl = locQueryUrl + search + apiKey;
  
    console.log(apiUrl);

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });


}

getFeaturedSearch();


  
    
