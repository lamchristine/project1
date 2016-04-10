console.log("Sanity Check!")

$(document).ready(function() {


  //sign up
  $('#signUp').on('click', function(){
    $('#signUpModal').modal('show');
  });

  $('#signUpForm').on('click', '.submit', function () {
    console.log("signed up!")
    console.log ( $("input[name = 'username']").val() );

  });

  console.log('app.js loaded!');
})
