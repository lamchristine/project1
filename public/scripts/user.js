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

      if (user === null) {
        alert("Please log in ");
      } else if ( user._id !== $(this).data('user-Id') ) {
        alert("You're not owner so can't edit");
      } else {

      var deleteId = $(this).data('user-Id');
      console.log( deleteId );
      $.ajax({
        method: 'DELETE',
        url: '/api/users/' + deleteId,
        success: deleteUserSuccess,
        error: deleteUserError,
      });
    }
  });

  //deletes a trip
  $user.on('click', '#delete_trip', function () {

    if (user === null) {
      alert("Please log in ");
    } else if ( user._id !== $(this).data('user-Id') ) {
      alert("You're not owner so can't edit");
    } else {

    var deleteTripId = $(this).data('trip-Id');
    console.log( '/api/users/' + $(this).data('user-Id') + '/trips/' + deleteTripId );
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
    console.log("add trip id:", addTripId);

    if (user === null) {
      alert("Please log in ");
    } else if (user._id !== addTripId) {
      alert("You're not owner so can't edit");
    } else {


    $('#trip_form input').val(''); //emptying fields everytime modal is open
    $('#trip_form textarea').val(''); //emptying fields everytime modal is open


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
    }
  });

  //edit a new trip
  $user.on('click', '#edit_trip', function () {
    var editUserId = $(this).closest('#edit_trip').data('user-Id');
    var editTripId = $(this).data('trip-Id');

    if (user === null) {
      alert("Please log in ");
    } else if (user._id !==editUserId) {
      alert("You're not owner so can't edit");
    } else {



    // $('#trip_form input').val(''); //emptying fields everytime modal is open
    // $('#trip_form textarea').val(''); //emptying fields everytime modal is open
    // var editUserId = $(this).closest('.edit_trip').data('user-Id');
    // var editTripId = $(this).data('trip-Id');
    // console.log(editTripId);


    // $(this).parents('.post').remove(); //removing clicked on album
    $('#tripModal').attr('data-user-Id', editTripId);
    $('#tripModal').modal('show');

    // console.log( $("input[name = 'city']").val() )
    // $('#city').val( $(this).)

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
    }
  });

  //search for posts
  $('#search').on('click', '.searchbtn', function (e) {
    e.preventDefault();
    var searchData = $('#search').serialize();
    console.log ( $("input[name = 'search']").val() );
    console.log("searchData", searchData) //search=Berlin
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
    if (user !== null) {
      $('#signUpBtn').remove();
      $('#logInBtn').remove();
      $('.dropdown').show();
      $('#p').text(" " + user.username );
    }
  } loggedIn();


}); //closes document ready


//renders to page
function render() {
  $user.empty();
  var userHtml = template ({user: allUsers});
  $user.append(userHtml);


  //view user profile
    $('.view_user').on('click', '#view_profile', function () {
      console.log($(this).data('user-Id'))
      // $('#modaluser').empty();
      // $('#modalage').empty();
      // $('#modalabout').empty();
      // $('#pic_modal').removeAttr('src');
      if (user === null) {
        alert("Please log in ");
      // } else if ( user._id !== $(this).data('user-Id') ) {
      //   alert("You're not owner so can't edit");
      } else {

      $.ajax({
        method: 'GET',
        url: '/api/users/' + $(this).data('user-Id'),
        success: viewUserSuccess,
        error: viewUserError,
      });
    }
  });

  //deletes a trip
  $('.delete_user').on('click', '#delete_user', function () {

    if (user === null) {
      alert("Please log in ");
    } else if ( user._id !== $(this).data('user-Id') ) {
      alert("You're not owner so can't edit");
    } else {

    var deleteTripId = $(this).data('trip-Id');
    console.log( '/api/users/' + $(this).data('user-Id') + '/trips/' + deleteTripId );
      $.ajax({
        method: 'DELETE',
        url: '/api/users/' + $(this).data('user-Id') + '/trips/' + deleteTripId,
        success: deleteTripSuccess,
        error: deleteTripError,
      });
    }
  });

// for (vari=0; i<allUsers.length; i++){
//   if (allPosts[i].image === null) {
//     allPosts[i].image = "/images/icon.png"
//   }
// }

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
  // alert("You must be owner to delete user")
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
  // alert("You must be owner to delete trip.")
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
  // alert("You must be owner to add trip")
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
  // alert("You must be owner in other to edit trip.")
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
  console.log(json)
  allUsers.push(json);
  render();
}

function newPostError() {
  console.log("Error posting");
  // alert("Can not create new post. Please log in first.")
}

function viewUserSuccess(json) {
  var user = json;
  console.log(user);
  var username = user.username;
  var image = user.image;
  var age = user.age;
  var blurb = user.blurb;
  // $('#profile.modal-body').empty();
  // $('#modaluser').empty();
  // $('#modalage').empty();
  // $('#modalabout').empty();
  // $('#pic_modal').removeAttr('src');


  renderToModal(user);
  $('#profileModal').modal('show');

    $('#closeprofile').on ('click', function(){
      alert("clicked")
      $('#modaluser').empty();
      $('#modalage').empty();
      $('#modalabout').empty();
      $('#pic_modal').removeAttr('src');
    });
}

function renderToModal(user) {
  var source = $('#modal-template').html();
  template = Handlebars.compile(source);

  console.log("USER", user.username);
  var test = template(user);
  console.log(test);
  $('#profile.modal-body').append(test);
}

function viewUserError () {
  console.log("error viewing")
}
