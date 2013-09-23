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
    UI.select(dropdownSelector, function(selectedLang) {
      var href = document.location.pathname,
        lang = document.querySelector( "html" ).lang;
      if(selectedLang === lang){
        window.location = href;
      }
      else if(href.indexOf(lang) >= 0){
        href = href.replace(lang, selectedLang);
        window.location = href;
      }
      else if(href.indexOf("/") >= 0){
        window.location = selectedLang+href;
      }
      else if(href.indexOf("/") < 0){
        href = href.substr(href.indexOf("/") + 0)
        window.location = "/"+selectedLang+href;
      }
    });

});
