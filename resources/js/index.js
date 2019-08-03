/* jshint strict: global */
/* jshint devel: true */
/* jshint browser: true */
/* jshint esversion: 6 */

'use strict';

var contentHeadings = document.querySelectorAll(".content-heading");
var numContentHeadings = contentHeadings.length;

window.onload = function() {

  document.querySelector("body").classList.add("into-position");

  var request = new XMLHttpRequest();
  request.open('GET', 'http://content.guardianapis.com/sections?q=business&api-key=ca502747-cd8a-4290-9c72-ccd2e8db9c2a', true);
  request.send();

  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    document.querySelector(".content-body").innerHTML = data.response.status;
  };

};

for (var i = 0; i < numContentHeadings; i++) {
  contentHeadings[i].addEventListener("click", function() {

    this.parentNode.querySelector(".content-body").classList.toggle("full-height");

    var arrowIcon = this.querySelector("span");

    arrowIcon.classList.toggle("fa-angle-down");
    arrowIcon.classList.toggle("fa-angle-up");
  });
}
