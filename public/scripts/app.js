console.log("Sanity Check!")

$(document).ready(function() {


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

  console.log("Currently logged in", user);


  console.log('app.js loaded!');
})
