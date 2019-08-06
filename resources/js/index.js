/* jshint strict: global */
/* jshint devel: true */
/* jshint browser: true */
/* jshint esversion: 6 */

'use strict';

// Guardian API
const G_ENDPOINT = "https://content.guardianapis.com/search?";
const G_SEARCH_TERM = "q=politics";
const G_SECTION = "section=australia-news";
const G_ORDER_BY = "order-by=newest";
const G_NUM_RESULTS = 10;
const G_PAGE_SIZE = "page-size=" + G_NUM_RESULTS;
const G_API_KEY = "api-key=ca502747-cd8a-4290-9c72-ccd2e8db9c2a";
const G_URL = G_ENDPOINT + G_SEARCH_TERM + "&" + G_SECTION + "&" + G_ORDER_BY + "&" + G_PAGE_SIZE + "&" + G_API_KEY;

// OpenWeatherMap API
const W_ENDPOINT = "https://api.openweathermap.org/data/2.5/forecast?";
const W_CITY_ID = "id=2155718";
const W_API_KEY = "appid=649156a9240a1ebacc8e6395876a40ea";
const W_UNITS = "units=metric"; // to output temperatures in Celsius (default is Kelvin)
const W_URL = W_ENDPOINT + W_CITY_ID + "&" + W_API_KEY + "&" + W_UNITS;
const W_NUM_RESULTS = 8; // api gives 5-day, 3-hourly, forecasts (40 in total). Just use the first 8 (covers 24 hours).

window.onload = function() {

  document.querySelector("body").classList.add("into-position"); // slide page into position

  setToggles(); // set the content headings to toggle the content on/off

  getPolitics(); // get politics news from Guardian API and insert into politics section

  getWeather(); // get weather data from OpenWeatherMap API and insert into weather section
};

function setToggles() {

  var contentHeadings = document.querySelectorAll(".content-heading");
  var numContentHeadings = contentHeadings.length;

  for (var i = 0; i < numContentHeadings; i++) {
    contentHeadings[i].addEventListener("click", function() {

      this.parentNode.querySelector(".content-body").classList.toggle("full-height");

      var arrowIcon = this.querySelector("span");

      arrowIcon.classList.toggle("fa-angle-down");
      arrowIcon.classList.toggle("fa-angle-up");
    });
  }
}

function getPolitics() {

  var request = new XMLHttpRequest();
  request.open('GET', G_URL, true);
  request.send();

  request.onload = function() {
    var parsedResponse = JSON.parse(this.response);

    var contentBody = document.querySelector(".politics .content-body");

    for (var i = 0; i < G_NUM_RESULTS; i++) {
      var newAnchor = document.createElement("a");
      newAnchor.setAttribute("href", parsedResponse.response.results[i].webUrl);
      newAnchor.innerHTML = parsedResponse.response.results[i].webTitle;
      contentBody.appendChild(newAnchor);
    }
  };
}

function getWeather() {

  var request = new XMLHttpRequest();
  request.open('GET', W_URL, true);
  request.send();

  request.onload = function() {
    var parsedResponse = JSON.parse(this.response);
    console.log(parsedResponse);

    var contentBody = document.querySelector(".weather .content-body");

    for (var i = 0; i < W_NUM_RESULTS; i++) {
      var newForecast = document.createElement("p");
      console.log(parsedResponse.list);
      var icon = parsedResponse.list[i].weather[0].icon + ".png";
      console.log(icon);
      var temp = parsedResponse.list[i].main.temp;
      newForecast.innerHTML = parsedResponse.list[i].weather[0].description + " " + temp;
      contentBody.appendChild(newForecast);
    }
  };
}
