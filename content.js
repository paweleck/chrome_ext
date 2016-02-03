// content.js

var _maxPrice = 2000;
var _priceClass = 'cenaNaKalendarzu';
var _priceRegex = '\\d*\\s\\d*';
var _price;

var strPriceToNumber = function(strPrice) {
  if (strPrice == null) {
    return null;
  }

  var match = new RegExp(_priceRegex).exec(strPrice);
  if (match == null) {
    return null;
  }
  var toParse = match[0].replace(/\s/g, '');
  return parseInt(toParse);
};

//chrome.runtime.onMessage.addListener(
//  function(request, sender, sendResponse) {
//    if( request.message === "clicked_browser_action" ) {

      var priceElems = $('.' + _priceClass);
      var minPriceFound = 999999.9;
      if (priceElems != null) {
        priceElems.each(function(index){
          var priceOfElem = strPriceToNumber(this.innerText);
          if (priceOfElem != null && priceOfElem < minPriceFound) {
            minPriceFound = priceOfElem;
          }
        });
        if (minPriceFound < _maxPrice) {
          console.info("Cena " + minPriceFound);
          chrome.runtime.sendMessage({"message": "price_found", "price": minPriceFound.toString()});
        }
      }

      //chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    //}
  //}
//);