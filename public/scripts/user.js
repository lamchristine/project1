var template;
var template1;

var user = [];
var $user;
var allUsers = [];


$(document).ready(function() {
  $user = $('#user');
  var source = $('#user-template').html();
  template = Handlebars.compile(source);

  var sourceq = $('#modal-template').html();
  template1 = Handlebars.compile(sourceq);

  //show all users' post
  $.ajax({
    method:'GET',
    url:'/api/users',
    success: onSuccess,
    error: onError,
  });

  //create a new user post
  $('#newPost').on('click', function(){
    $.ajax({
      method: 'POST',
      url: '/api/users',
      success: newPostSuccess,
      error: newPostError,
    });
  });

  //delete a trip
  $user.on('click', '#delete_trip', function () {
    //user authorization
    if (user === null) {
      alert("Please log in ");
    } else if ( user._id !== $(this).data('user-Id') ) {
      alert("You're not owner so can't edit");
    } else {
      var deleteTripId = $(this).data('trip-Id');
      //make ajax call
      $.ajax({
        method: 'DELETE',
        url: '/api/users/' + $(this).data('user-Id') + '/trips/' + deleteTripId,
        success: deleteTripSuccess,
        error: deleteTripError,
      });
    }
  });

  //create a new trip
  $user.on('click', '.add_trip', function () {
    var addTripId = $(this).closest('.add_trip').data('user-Id');
    //user authorization
    if (user === null) {
      alert("Please log in ");
    } else if (user._id !== addTripId) {
      alert("You're not owner so can't edit");
    } else {
      //modal opens
      $('#trip_form input').val('');
      $('#trip_form textarea').val('');
      $('#tripModal').attr('data-user-Id', addTripId);
      $('#tripModal').modal('show');
      $('#saveTrip').on('click', function(e){
        e.preventDefault();
        $(this).off('click');
        $('#tripModal').modal('hide');
        var modalData = $('#trip_form').serialize();
        //make ajax call to db
        $.ajax({
          method: 'POST',
          url: '/api/users/' + addTripId +  '/trips',
          data: modalData,
          success: tripAddSuccss,
          error: tripAddError,
        });
      });
    }
  });

  //edit a trip
  $user.on('click', '#edit_trip', function () {
    var editUserId = $(this).closest('#edit_trip').data('user-Id');
    var editTripId = $(this).data('trip-Id');
    //user authorization
    if (user === null) {
      alert("Please log in ");
    } else if (user._id !==editUserId) {
      alert("You're not owner so can't edit");
    } else {
      //prepopulating modal with existing data
      allUsers.forEach(function(user) {
        if (editUserId === user._id) {
          user.trips.forEach(function(trip) {
            if(editTripId === trip._id) {
              $("#city").val(trip.city);
              $("#country").val(trip.country);
              $("textarea#description").val(trip.description);
            }
          });
        }
      });
      //modal opens
      $('#tripModal').attr('data-user-Id', editTripId);
      $('#tripModal').modal('show');
      $('#saveTrip').on('click', function(e){
        e.preventDefault();
        $(this).off('click');
        $('#tripModal').modal('hide');
        var modalData = $('#trip_form').serialize();
        //make ajax call
        $.ajax({
          method: 'PUT',
          url: '/api/users/' + editUserId +  '/trips/' + editTripId,
          data: modalData,
          success: tripEditSuccss,
          error: tripEditError,
        });
      });
    }
  });

  //search posts
  $('#search').on('click', '.searchbtn', function (e) {
    e.preventDefault();
    var searchData = $('#search').serialize();
    var url = '/api/users/search';
    //make ajax call
    $.ajax({
      method: 'GET',
      url: url,
      data: searchData,
      success: searchSuccess,
      error: searchError,
    });
    $('#search input').val('');
  });

  //user sign up
  $('#signUpBtn').on('click', function(){
    $("#signUpForm input").val('');
    $('#signUpModal').modal('show');
  });

  $('#sign').on('click', function () {
    console.log("signed up!");
    console.log ( $("input[name = 'username']").val() );
    $('#signUpModal').modal('hide');
  });

  //user log in
  $('#logInBtn').on('click', function(){
    $("#logInForm input").val('');
    $('#logInModal').modal('show');
  });

  $('#log').on('click', function () {
    console.log("signed up!");
    console.log ( $("input[name = 'username']").val() );
    $('#logInModal').modal('hide');
  });

  //checking to see if there is a user logged in
  function loggedIn() {
    if (user !== null) {
      $('#signUpBtn').remove();
      $('#logInBtn').remove();
      $('.dropdown').show();
      $('#p').text(" " + user.username );
    }
  } loggedIn();
});

//renders to page
function render() {
  $user.empty();
  var userHtml = template ({user: allUsers});
  $user.append(userHtml);

  //view user profile
  $('.view_user').on('click', '#view_profile', function () {
    //user authorization (all signed in users can view profile)
    if (user === null) {
      alert("Please log in ");
    } else {
      $.ajax({
        method: 'GET',
        url: '/api/users/' + $(this).data('user-Id'),
        success: viewUserSuccess,
        error: viewUserError,
      });
    }
  });

  //delete a user
  $('.delete_user').on('click', '#delete_user', function () {
    //user authorization
    if (user === null) {
      alert("Please log in ");
    } else if ( user._id !== $(this).data('user-Id') ) {
      alert("You're not owner so can't edit");
    } else {
      var deleteId = $(this).data('user-Id');
      //make ajax call
      $.ajax({
        method: 'DELETE',
        url: '/api/users/' + deleteId,
        success: deleteUserSuccess,
        error: deleteUserError,
      });
    }
  });
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
  var tripId = trip._id;
  for (var i=0;i<allUsers.length; i++) {
    if (allUsers[i]._id === tripId) {
      allUsers[i] = trip;
      break;
    }
  }
  render();
}

function tripEditError() {
  console.log("error in updating");
}

function searchSuccess(json) {
  var user = json;
  allUsers = user;
  render();
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

function viewUserSuccess(json) {
  var user = json;
  allUsers = json;
  renderToModal();
}

function renderToModal(user) {
  $('#profile').empty();
  var test = template1({user:allUsers});
  $('#profile.modal-body').append(test);
  $('#profileModal').modal('show');
}

function viewUserError () {
  console.log("error viewing");
}
