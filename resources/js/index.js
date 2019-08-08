/* jshint strict: global */
/* jshint browser: true */
/* jshint esversion: 6 */

'use strict';

// Guardian API
const G_ENDPOINT = "https://content.guardianapis.com/search?";
const G_SEARCH_TERM = "q=australia-politics";
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
const W_ICON_URL = "https://openweathermap.org/img/wn/";

// Google Sheets JSON URL
const T_SPREADSHEET_ID = "1ePMu0ChJHWYFV9_jvT8o4ER_H1DnmeRcyH7K-uHF8Mc";
const T_WORKSHEET_ID = "od6";
const T_URL = "https://spreadsheets.google.com/feeds/list/" + T_SPREADSHEET_ID + "/" + T_WORKSHEET_ID + "/public/values?alt=json";

window.onload = function() {

  document.querySelector("body").classList.add("into-position"); // slide page into position

  setToggles(); // set the content headings to toggle the content on/off

  getContent(".politics", G_URL, showPolitics);

  getContent(".weather", W_URL, showWeather);

  getContent(".tasks", T_URL, showTasks);
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

function getContent(sectionClass, apiURL, sectionFunction) {

  var request = new XMLHttpRequest();
  request.open('GET', apiURL, true);
  request.send();

  request.onload = function() {

    var parsedResponse = JSON.parse(this.response);
    var contentBody = document.querySelector(sectionClass + " .content-body");
    sectionFunction(parsedResponse, contentBody);
  };
}

function showPolitics(parsedResponse, contentBody) {

  var results = parsedResponse.response.results;

  for (var i = 0; i < G_NUM_RESULTS; i++) {
    var newAnchor = document.createElement("a");
    newAnchor.setAttribute("href", results[i].webUrl);
    newAnchor.setAttribute("target", "_blank");
    newAnchor.innerHTML = results[i].webTitle;
    contentBody.appendChild(newAnchor);
  }
}

function showWeather(parsedResponse, contentBody) {

  var forecastList = parsedResponse.list;

  for (var i = 0; i < W_NUM_RESULTS; i++) {

    var oneEntry = document.createElement("p");
    var oneForecast = forecastList[i];

    // time
    var dateStamp = oneForecast.dt * 1000;
    var time = new Date(dateStamp).toTimeString().slice(0, 5);
    var newTimeSpan = document.createElement("span");
    newTimeSpan.innerHTML = time;
    oneEntry.appendChild(newTimeSpan);

    // icon
    var iconFileName = oneForecast.weather[0].icon + "@2x.png";
    var newImage = document.createElement("img");
    newImage.setAttribute("src", W_ICON_URL + iconFileName);
    oneEntry.appendChild(newImage);

    // temperature
    var temp = oneForecast.main.temp;
    var newForecastSpan = document.createElement("span");
    newForecastSpan.innerHTML = Math.round(parseFloat(temp));
    oneEntry.appendChild(newForecastSpan);

    // conditions
    var conditions = oneForecast.weather[0].description;
    var newConditionsSpan = document.createElement("span");
    newConditionsSpan.innerHTML = conditions;
    oneEntry.appendChild(newConditionsSpan);

    // put entry into content body
    contentBody.appendChild(oneEntry);
  }
}

function showTasks(parsedResponse, contentBody) {

  var taskList = parsedResponse.feed.entry;
  var numTasks = taskList.length;

  for (var i = 0; i < numTasks; i++) {
    var oneTask = taskList[i].gsx$_cn6ca.$t;
    var newPara = document.createElement("p");
    newPara.innerHTML = "🔷 " + oneTask;
    contentBody.appendChild(newPara);
  }
}
