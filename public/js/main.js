// requirejs setup to use for the front-end in the homepage
requirejs.config({
  baseDir:'/js',
  paths: {
    'text': '/bower/text/text'
  }
});

require(['ui'],
  function (UI) {
    'use strict';

    var dropdownSelector = document.querySelector( ".dropdown-options" )

    // URL redirector for language picker
    UI.langPicker(dropdownSelector);
});
