/* jshint strict: global */
/* jshint devel: true */
/* jshint browser: true */

'use strict';

var contentHeadings = document.querySelectorAll(".content-heading");
var numContentHeadings = contentHeadings.length;

window.onload = function() {

  document.querySelector("body").classList.add("into-position");
};

for (var i = 0; i < numContentHeadings; i++) {
  contentHeadings[i].addEventListener("click", function() {

    this.parentNode.querySelector(".content-body").classList.toggle("full-height");

    var arrowIcon = this.querySelector("span");

    arrowIcon.classList.toggle("fa-angle-down");
    arrowIcon.classList.toggle("fa-angle-up");
  });
}
