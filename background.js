var _refreshInterval = 60 * 1000;

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

var opt = {
  type: "basic",
  title: "Rainbow - tani bilet",
  message: "",
  iconUrl: "rb_mobile_once.gif"
};

setInterval(function () {
  chrome.tabs.query({url: "http://biletyczarterowe.r.pl/*", currentWindow: true}, function (arrayOfTabs) {
    chrome.tabs.reload(arrayOfTabs[0].id);
  });
}, _refreshInterval);

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "price_found") {
      opt.message = "Cena " + request.price;
      chrome.notifications.create("2", opt);
    }
  }
);