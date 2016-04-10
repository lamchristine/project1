console.log("Sanity Check!")
var template;

var user = [];
var $user;
var allUsers = [];


$(document).ready(function() {
  console.log('app.js loaded!');

  $user = $('#user');
  var source = $('#user-template').html();
  template = Handlebars.compile(source);


  //shows all posts
    $.ajax({
      method:'GET',
      url:'/api/users',
      success: onSuccess,
      error: onError,
    });

  //create a new post
  $('#newPost').on('click', function(){
    console.log("new post clicked")
    $.ajax({
      method: 'POST',
      url: '/api/users',
      success: newPostSuccess,
      error: newPostError,
    });
  });



  //deletes a post
    $user.on('click', '.delete_user', function () {
      var deleteId = $(this).data('user-Id');
      console.log( deleteId );
      $.ajax({
        method: 'DELETE',
        url: '/api/users/' + deleteId,
        success: deleteUserSuccess,
        error: deleteUserError,
      });
    });

  //deletes a trip
  $user.on('click', '.delete_trip', function () {
    var deleteTripId = $(this).data('trip-Id');
    console.log( '/api/users/' + $(this).data('user-Id') + '/trips/' + deleteTripId );
    $.ajax({
      method: 'DELETE',
      url: '/api/users/' + $(this).data('user-Id') + '/trips/' + deleteTripId,
      success: deleteTripSuccess,
      error: deleteTripError,
    });
  });

  //create a new trip
  $user.on('click', '.add_trip', function () {

    $('#trip_form input').val(''); //emptying fields everytime modal is open
    $('#trip_form textarea').val(''); //emptying fields everytime modal is open
    var addTripId = $(this).closest('.add_trip').data('user-Id');
    console.log(addTripId);

    // $(this).parents('.post').remove(); //removing clicked on album
    $('#tripModal').attr('data-user-Id', addTripId);
    $('#tripModal').modal('show');

      $('#saveTrip').on('click', function(e){
        e.preventDefault();
        $(this).off('click');
        $('#tripModal').modal('hide');
        var modalData = $('#trip_form').serialize();
        console.log(modalData);

          $.ajax({
            method: 'POST',
            url: '/api/users/' + addTripId +  '/trips',
            data: modalData,
            success: tripAddSuccss,
            error: tripAddError,
          });
      });
  });

  //edit a new trip
  $user.on('click', '.edit_trip', function () {
    $('#trip_form input').val(''); //emptying fields everytime modal is open
    $('#trip_form textarea').val(''); //emptying fields everytime modal is open
    var editUserId = $(this).closest('.edit_trip').data('user-Id');
    var editTripId = $(this).data('trip-Id');
    // console.log(editTripId);

    // $(this).parents('.post').remove(); //removing clicked on album
    $('#tripModal').attr('data-user-Id', editTripId);
    $('#tripModal').modal('show');

      $('#saveTrip').on('click', function(e){
        e.preventDefault();
        $(this).off('click');
        console.log(editTripId, editUserId);
        $('#tripModal').modal('hide');
        var modalData = $('#trip_form').serialize();
        // console.log(modalData);

          $.ajax({
            method: 'PUT',
            url: '/api/users/' + editUserId +  '/trips/' + editTripId,
            data: modalData,
            success: tripEditSuccss,
            error: tripEditError,
          });
      });
  });

  //search for posts
  $('#search').on('click', '.searchbtn', function (e) {
    e.preventDefault();
    var searchData = $('#search').serialize();
    var url = '/api/users/search';

    $.ajax({
      method: 'GET',
      url: url,
      data: searchData,
      success: searchSuccess,
      error: searchError,
    });
    $('#search input').val('');
  });


  //sign up
  $('#signUpBtn').on('click', function(){
    $("#signUpForm input").val('');
    $('#signUpModal').modal('show');
  });

  $('#sign').on('click', function () {
    console.log("signed up!");
    console.log ( $("input[name = 'username']").val() );
    $('#signUpModal').modal('hide');
  });

  //log in
  $('#logInBtn').on('click', function(){
    $("#logInForm input").val('');
    $('#logInModal').modal('show');
  });

  $('#log').on('click', function () {
    console.log("signed up!");
    console.log ( $("input[name = 'username']").val() );
    $('#logInModal').modal('hide');
  });



  function loggedIn() {
    if (user.username !== null) {
      $('#signUpBtn').remove();
      $('#logInBtn').remove();
      $('.dropdown').show();

      $('#p').text( user.username );
      // $('ul.right').append('<ul class="dropdown-menu" aria-labelledby="dropdownMenuDivider"><li>Profile</li><li role="separator" class="divider"></li><li>Log Out</li>');
    }
  } loggedIn();







}); //closes document ready


//renders to page
function render() {
  $user.empty();
  var userHtml = template ({user: allUsers});
  $user.append(userHtml);
}


function onSuccess(json){
  console.log("all users displayed");
  allUsers = json;
  render();
}

function onError(json){
  console.log("error");
}

function deleteUserSuccess(json) {
  console.log("delete success");
  var userId = json._id;
  for (var i=0; i<allUsers.length; i++) {
    if (allUsers[i]._id === userId) {
      allUsers.splice(i, 1);
      break;
    }
  }
  render();
}

function deleteUserError() {
  console.log("delete error");
}

function deleteTripSuccess(json) {
  var user = json;
  var userId = user._id;
  for (var i=0; i<allUsers.length; i++) {
    if (allUsers[i]._id === userId) {
      allUsers[i] = user;
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
  var newUser = json;
  var newUserId= newUser._id;

  for(var i=0;i<allUsers.length;i++) {
    if (allUsers[i]._id === newUserId) {
      allUsers[i] = newUser;
      break;
    }
  }
  render();
}

function tripAddError () {
  console.log("error in adding new trip");
}

function tripEditSuccss(json) {
  var trip = json;
  console.log("updated trip", json);
  var tripId = trip._id;
  for (var i=0;i<allUsers.length; i++) {
    if (allUsers[i]._id === tripId) {
      allUsers[i] = trip;
      console.log(trip);
      break;
    }
  }
  render();
}

function tripEditError() {
  console.log("error in updating");
}

function searchSuccess(json) {
  console.log(json);
  var user = json;
  allUsers = user;
  render();
  console.log(allUsers);
}

function searchError(json) {
  console.log("Error searching");
}

function newPostSuccess(json) {
  allUsers.push(json);
  render();
}

function newPostError() {
  console.log("Error posting");
}
