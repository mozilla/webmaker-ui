/**
 * This file is used to construct/replace the select element 
 * that we used to display for the drop down menu
 */

define([ "text!./webmaker-ui-fragments.html" ], function(_fragments) {
  "use strict";

  var UI = {},
    fragments = document.createElement("div");
  fragments.innerHTML = _fragments;

  // URL redirector for language picker
  UI.langPicker = function(elem) {
    UI.select(elem, function(selectedLang) {
      var matchesLang,
          href = document.location.pathname,
          lang = document.querySelector("html").lang,
          supportedLanguages = elem.getAttribute("data-supported"),
          // matches any of these: 
          // `en`, `en-us`, `en-US` or `ady` 
          matches = href.match(/([a-z]{2,3})([-]([a-zA-Z]{2}))?/);

          if (matches) {
            if(matches[2]) {
              matchesLang = matches[1].toLowerCase() + matches[2].toUpperCase();
            } else {
              matchesLang = matches[1].toLowerCase();
            }
          }
      // if the selected language is match to the language in the header
      if (selectedLang === lang) {
        return;
      // check if we have any matches and they are exist in the array we have
      } else if ((matches && matches[0]) && supportedLanguages.indexOf(matchesLang) !== -1) {
        href = href.replace(matches[0], selectedLang);
        window.location = href;
      } else {
        window.location = "/" + selectedLang + href;
      }
    });
  };

  UI.select = function(select, onSelectedHandler) {

   var el = fragments.querySelector(".ui-select").cloneNode(true),
   toggleBtn = el.querySelector(".icon"),
   selectedEl = el.querySelector(".ui-selected"),
   menuContainer = el.querySelector(".ui-select-menu"),
   menu = menuContainer.querySelector("ul"),
   li = menu.querySelector("li"),
   showing = false;

   var options = select.querySelectorAll("option"),
   id = select.id;

   onSelectedHandler = onSelectedHandler || function() {};

   var option,
   val,
   html,
   newLi,
   currentSelected;

   for (var i = 0; i < options.length; i++) {
     option = options[i];
     val = option.value;
     html = option.innerHTML;

     newLi = li.cloneNode(true);
     newLi.setAttribute("data-value", val);
     newLi.innerHTML = html;

     if (option.selected) {
       newLi.setAttribute("data-selected", true);
       selectedEl.innerHTML = html;
     }
     newLi.addEventListener("click", function() {
      var value = this.getAttribute("data-value");
       currentSelected = menu.querySelector("[data-selected]");
       if (currentSelected) {
        currentSelected.removeAttribute("data-selected");
      }
      this.setAttribute("data-selected", true);
      selectedEl.innerHTML = this.innerHTML;
      menuContainer.style.display = "none";
      onSelectedHandler(value);
      select.value = value;
    }, false);
     menu.appendChild(newLi);
   }

    (function loadOurStuff() {
      var langList = document.querySelectorAll(".langList");

      function showOption() { 
        if(!showing) {
          showing = true;
          menuContainer.style.display = "block";
        }
      }

      function hideOption() {
        if(showing) {
          showing = false;
          menuContainer.style.display = "none";
        }
      }

      // We are checking if the list has been loaded or not and if not then
      // we are going to wait for another 500ms then loadOurStuff again
      if (langList.length === 0) {
        return setTimeout(loadOurStuff, 500);
      }

      // Event listeners
      el.addEventListener("mouseover", showOption);
      el.addEventListener("mouseout", hideOption);
      menuContainer.addEventListener("mouseover", showOption);
      menuContainer.addEventListener("mouseout", hideOption);
     
    }());

   el.id = id;
   select.id = "";

   li.parentNode.removeChild(li);
   select.parentNode.insertBefore(el, select.nextSibling);
   select.style.display = "none";
 };

 return UI;

});
