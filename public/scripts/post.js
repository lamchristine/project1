console.log("Sanity Check!")
var template;



$(document).ready(function() {
  console.log('app.js loaded!');

  $.ajax({
    method:'GET',
    url:'/post',
    success: onSuccess,
    error: onError,
  });
}); //closes document ready

function onSuccess(json){
  console.log("all posts displayed");
}

function onError(json){
  console.log("error");
}
