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
  },

  "click button[name='accept']": function(event, template){
    var grName = Meteor.user().profile.toGroup;
    Group.update({_id: Group.findOne({name: grName})._id}, {$push: {users: Meteor.user().username}});
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.group": grName, "profile.invite": "", "profile.fromUser": "", "profile.toGroup": ""}});
  },
  "click button[name='reject']": function(event, template){
    Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.invite": "", "profile.fromUser": "", "profile.toGroup": ""}});
  }
});
