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
  $post.on('click', '.delete_post', function () {
    var deleteId = $(this).data('post-Id');
    console.log( deleteId );
    $.ajax({
      method: 'DELETE',
      url: '/api/posts/' + deleteId,
      success: deletePostSuccess,
      error: deletePostError,
    });
  });

//deletes a trip
$post.on('click', '.delete_trip', function () {
  var deleteTripId = $(this).data('trip-Id');
  console.log( '/api/posts/' + $(this).data('post-Id') + '/trips/' + deleteTripId );
  $.ajax({
    method: 'DELETE',
    url: '/api/posts/' + $(this).data('post-Id') + '/trips/' + deleteTripId,
    success: deleteTripSuccess,
    error: deleteTripError,
  });
});

//create a new trip
$post.on('click', '.add_trip', function () {

  $('#trip_form input').val(''); //emptying fields everytime modal is open
  $('#trip_form textarea').val(''); //emptying fields everytime modal is open
  var addTripId = $(this).closest('.add_trip').data('post-Id');
  console.log(addTripId);

  $('#tripModal').attr('data-post-Id', addTripId);
  $('#tripModal').modal('show');

    $('#saveTrip').on('click', function(e){
      e.preventDefault();
      $('#tripModal').modal('hide');
      var modalData = $('#trip_form').serialize();
      console.log(modalData);

        $.ajax({
          method: 'POST',
          url: '/api/posts/' + addTripId +  '/trips',
          data: modalData,
          success: tripAddSuccss,
          error: tripAddError,
        });
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

function deleteTripSuccess(json) {
  var post = json;
  var postId = post._id;
  for (var i=0; i<allPosts.length; i++) {
    if (allPosts[i]._id === postId) {
      allPosts[i] = post;
      break;
    }
  }
  render();
}

function deleteTripError(){
  console.log("error in deleting trip");
}

function tripAddSuccss(json){
  console.log(json);
  var newPost = json;
  var newPostId= newPost._id;

  for(var i=0;i<allPosts.length;i++) {
    if (allPosts[i]._id === newPostId) {
      allPosts[i] = newPost;
      break;
    }
  }
  render();
}

function tripAddError () {
  console.log("error in adding new trip");
}
