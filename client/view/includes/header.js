Template.header.events({
  "click button[name='enter']": function(event, template){
     Meteor.loginWithPassword($('input#userName').val(), $('input#pass').val());
     $('input#userName').val("");
     $('input#pass').val("");
  },
  "click a[name='logout']": function(event, template){
    Meteor.logout();
  },
  "click button[name='registrate']": function(event, template){
    var _username = $('input#newUserName').val();
    var _email = $('input#newUserEmail').val();
    var _pass = $('input#newUserPass').val();
    var _passConfirm = $('input#newUserPassConfirm').val();

    $('input#newUserName').val("");
    $('input#newUserEmail').val("");
    $('input#newUserPass').val("");
    $('input#newUserPassConfirm').val("");
    if(_pass == _passConfirm){
      var userObject = {
        username: _username,
        email: _email,
        password: _pass
      };
      Accounts.createUser(userObject);
    }
  }
});
