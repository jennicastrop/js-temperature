"use strict";

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
  loadingText.style.display = 'block';
  weatherBox.style.display = 'none';
  var cityName = searchCity.value;
  if(cityName.trim().length === 0 ) {
    return alert('Please enter a City Name');
  }
  var http = new XMLHttpRequest();
  var apiKey = 'ffc072b18e4fb5bc233a7d1d6a6e6e35';
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName+ '&units=metric&appid=' + apiKey
  var method = 'GET';

  http.open(method, url);
  http.onreadystatechange = function() {
    if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
      var data = JSON.parse(http.responseText);
      var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase())
      weatherData.temperature = data.main.temp;
      updateWeather(weatherData);
    } else if(http.readyState ===  XMLHttpRequest.DONE) {
      alert('Something went wrong!');
    }
  }
  http.send()
}

function updateWeather(weatherData) {
  weatherCity.textContent = weatherData.cityName;
  weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature;

  loadingText.style.display = 'none';
  weatherBox.style.display = 'block'
}
