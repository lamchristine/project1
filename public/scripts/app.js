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

  //create a new post
  $('#newPost').on('click', function(){
    $.ajax({
      method: 'POST',
      url: '/api/users',
      success: newPostSuccess,
      error: newPostError,
    });
  });

  //delete a post
  $user.on('click', '#delete_post', function () {
    //user authorization
    if (user === null) {
      alert("Please log in ");
    } else if ( user._id !== $(this).data('user-Id') ) {
      alert("You're not owner so can't edit");
    } else {
      var deletePostId = $(this).data('post-Id');
      //make ajax call
      $.ajax({
        method: 'DELETE',
        url: '/api/users/' + $(this).data('user-Id') + '/posts/' + deletePostId,
        success: deletePostSuccess,
        error: deletePostError,
      });
    }
  });

  //create a new post
  $user.on('click', '.add_post', function () {
    var addPostId = $(this).closest('.add_post').data('user-Id');
    //user authorization
    if (user === null) {
      alert("Please log in ");
    } else if (user._id !== addPostId) {
      alert("You're not owner so can't edit");
    } else {
      //modal opens
      $('#post_form input').val('');
      $('#post_form textarea').val('');
      $('#postModal').attr('data-user-Id', addPostId);
      $('#postModal').modal('show');
      $('#savePost').on('click', function(e){
        e.preventDefault();
        $(this).off('click');
        $('#postModal').modal('hide');
        var modalData = $('#post_form').serialize();
        //make ajax call to db
        $.ajax({
          method: 'POST',
          url: '/api/users/' + addPostId +  '/posts',
          data: modalData,
          success: postAddSuccss,
          error: postAddError,
        });
      });
    }
  });

  //edit a post
  $user.on('click', '#edit_post', function () {
    var editUserId = $(this).closest('#edit_post').data('user-Id');
    var editPostId = $(this).data('post-Id');
    //user authorization
    if (user === null) {
      alert("Please log in ");
    } else if (user._id !==editUserId) {
      alert("You're not owner so can't edit");
    } else {
      //prepopulating modal with existing data
      allUsers.forEach(function(user) {
        if (editUserId === user._id) {
          user.posts.forEach(function(post) {
            if(editPostId === post._id) {
              $("#city").val(post.city);
              $("#country").val(post.country);
              $("textarea#description").val(post.description);
            }
          });
        }
      });
      //modal opens
      $('#postModal').attr('data-user-Id', editPostId);
      $('#postModal').modal('show');
      $('#savePost').on('click', function(e){
        e.preventDefault();
        $(this).off('click');
        $('#postModal').modal('hide');
        var modalData = $('#post_form').serialize();
        //make ajax call
        $.ajax({
          method: 'PUT',
          url: '/api/users/' + editUserId +  '/posts/' + editPostId,
          data: modalData,
          success: postEditSuccss,
          error: postEditError,
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

function deletePostSuccess(json) {
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

function deletePostError(){
  console.log("error in deleting post");
}

function postAddSuccss(json){
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

function postAddError () {
  console.log("error in adding new trip");
}

function postEditSuccss(json) {
  var post = json;
  var postId = post._id;
  for (var i=0;i<allUsers.length; i++) {
    if (allUsers[i]._id === postId) {
      allUsers[i] = post;
      break;
    }
  }
  render();
}

function postEditError() {
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
