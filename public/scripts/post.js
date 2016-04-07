console.log("Sanity Check!")
var template;

var post = [];
var $post;
var allPosts = [];


$(document).ready(function() {
  console.log('app.js loaded!');

  $post = $('#post');
  var source = $('#post-template').html();
  template = Handlebars.compile(source);


  $.ajax({
    method:'GET',
    url:'/post/all',
    success: onSuccess,
    error: onError,
  });
}); //closes document ready

function render() {
  $post.empty();
  var postHtml = template ({post: allPosts});
  $post.append(postHtml);
}

function onSuccess(json){
  console.log("all posts displayed");
  allPosts = json;
  render();
}

function onError(json){
  console.log("error");
}
