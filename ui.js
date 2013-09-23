/**
 * This file is used to construct/replace the select element 
 * that we used to display for the drop down menu
 */

define( [ "text!./ui-fragments.html" ], function( _fragments ) {
  "use strict";

  var UI = {},
    fragments = document.createElement( "div" );
  fragments.innerHTML = _fragments;

  UI.select = function( select, onSelectedHandler ) {

   var el = fragments.querySelector(".ui-select").cloneNode(true),
   toggleBtn = el.querySelector(".icon"),
   selectedEl = el.querySelector(".ui-selected"),
   menuContainer = el.querySelector(".ui-select-menu"),
   menu = menuContainer.querySelector("ul"),
   li = menu.querySelector("li");

   var options = select.querySelectorAll('option'),
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
      selectedEl.innerHTML = html;
      menuContainer.style.display = "none";
      onSelectedHandler(value);
      select.value = value;
    }, false);
     menu.appendChild(newLi);
   }

   selectedEl.addEventListener("click", function(e) {
     menuContainer.style.display = menuContainer.style.display ? "": "block";
   }, false);

   toggleBtn.addEventListener("click", function(e) {
     menuContainer.style.display = menuContainer.style.display ? "": "block";
   }, false);

   el.id = id;
   select.id = "";

   li.parentNode.removeChild(li);
   select.parentNode.insertBefore(el, select.nextSibling);
   select.style.display = "none";
 };

 return UI;

});
