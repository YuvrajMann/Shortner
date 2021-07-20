$(document).ready(function(){
  $(".mapper").click(function(){
    chrome.tabs.create({
      url: 'mapper.html'
    });
  });
  $(".shortner").click(function(){
    chrome.tabs.create({
      url: 'shortner.html'
    });
  });
});