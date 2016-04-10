console.log("Sanity Check!")

$(document).ready(function() {


  //sign up
  $('#signUpBtn').on('click', function(){
    $("#signUpForm input").val('');
    $('#signUpModal').modal('show');
  });

  $('#sign').on('click', function () {
    console.log("signed up!")
    console.log ( $("input[name = 'username']").val() );
    $('#signUpModal').modal('hide');
  });

  //log in
  $('#logInBtn').on('click', function(){
    $("#logInForm input").val('');
    $('#logInModal').modal('show');
  });

  $('#log').on('click', function () {
    console.log("signed up!")
    console.log ( $("input[name = 'username']").val() );
    $('#logInModal').modal('hide');
  });

  console.log('app.js loaded!');
})
