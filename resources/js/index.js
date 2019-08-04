/* jshint strict: global */
/* jshint devel: true */
/* jshint browser: true */
/* jshint esversion: 6 */

'use strict';

// Guardian API
const G_ENDPOINT = "http://content.guardianapis.com/search?";
const G_SEARCH_TERM = "q=politics";
const G_SECTION = "section=australia-news";
const G_ORDER_BY = "order-by=newest";
const G_NUM_RESULTS = 10;
const G_PAGE_SIZE = "page-size=" + G_NUM_RESULTS;
const G_API_KEY = "api-key=ca502747-cd8a-4290-9c72-ccd2e8db9c2a";
const G_URL = G_ENDPOINT + "&" + G_SEARCH_TERM + "&" + G_SECTION + "&" + G_ORDER_BY + "&" + G_PAGE_SIZE + "&" + G_API_KEY;

window.onload = function() {

  document.querySelector("body").classList.add("into-position"); // slide page into position

  setToggles(); // set the content headings to toggle the content on/off

  getPolitics(); // get politics news from Guardian API and insert into politics section
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
    console.log(parsedResponse);

    var contentBody = document.querySelector(".politics .content-body");
    for (var i = 0; i < G_NUM_RESULTS; i++) {
      var newPara = document.createElement("p");
      newPara.innerHTML = parsedResponse.response.results[i].webTitle;
      contentBody.appendChild(newPara);
    }
  };
}
