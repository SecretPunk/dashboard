/* jshint strict: global */ /* NOTE THESE DOWN */
/* jshint devel: true */
/* jshint browser: true */

'use strict';

var contentHeadings = document.querySelectorAll(".content-heading");
var numContentHeadings = contentHeadings.length;

for (var i = 0; i < numContentHeadings; i++) {
  contentHeadings[i].addEventListener("click", function() {

    this.parentNode.querySelector(".content-body").classList.toggle("content-show");
  });
}
