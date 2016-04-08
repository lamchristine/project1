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

//shows all posts
  $.ajax({
    method:'GET',
    url:'/api/posts',
    success: onSuccess,
    error: onError,
  });

//deletes a post
  $post.on('click', '.delete_post', function (e) {
    var deleteId = $(this).data('post-Id');
    console.log( deleteId );
    $.ajax({
      method: 'DELETE',
      url: '/api/posts/' + deleteId,
      success: deletePostSuccess,
      error: deletePostError,
    });
  });
}); //closes document ready

//renders to page
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

function deletePostSuccess(json) {
  console.log("delete success");
  var postId = json._id;
  for (var i=0; i<allPosts.length; i++) {
    if (allPosts[i]._id === postId) {
      allPosts.splice(i, 1);
      break;
    }
  }
  render();
}

function deletePostError() {
  console.log("delete error");
}
