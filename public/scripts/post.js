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
    url:'/api/posts',
    success: onSuccess,
    error: onError,
  });

  $post.on('click', '.delete_post', function (e) {
    var deleteId = $(this).closest('.post').data('postId');
    console.log( deleteId );
  });


}); //closes document ready

function render(post) {
  // $post.empty();
  var postHtml = template (post);
  $post.append(postHtml);
}

function onSuccess(posts){
  console.log("all posts displayed");
  posts.forEach(function (post) {
    render(post)
  });
  // allPosts = json;
  // render();
}

function onError(json){
  console.log("error");
}
