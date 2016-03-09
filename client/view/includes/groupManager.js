Template.groupManager.events({
  /*"change input[name='test']": function(event, template){
    //newFile = new FS.File(event.target.files);
    console.log(event);
    console.log(event.target);
    console.log(event.target.files[0]);
    newFile = new FS.File(event.target.files[0]);
    newFile.groupLogo = "Dev";
    console.log(newFile);
        photos.insert(newFile);
  },*/

  "click button[name='registrate']": function(event, template){
    var groupName = $('input#groupName').val();
    if(Group.findOne({name: groupName}) === undefined){
      console.log(groupName);
      console.log(Meteor.user().username);
      Group.insert({
        name: groupName,
        createUser: Meteor.user().username,
        users: [Meteor.user().username]
      });
      Meteor.users.update(Meteor.userId(), {$set: {profile: {group: groupName}}});
      //insert group logo
      newFile = new FS.File($('input#groupLogo')[0].files[0]);
      newFile.groupLogo = groupName;
      photos.insert(newFile);
  } else {
      console.log('this groupe exsist');
    }
  },

  "click button[name='addUser']": function(event, template){
    var userName = $('input[name="userName"]').val();
    var groupName = Meteor.user().profile.group;
    console.log(userName);
    console.log(groupName);
    if (Meteor.users.findOne({username: userName})){
      for (var i = 0; i < Group.findOne({name: groupName}).users.length; i++ ){
        if (Group.findOne({name: groupName}).users[i] == userName){
          console.log("user already in group");
          return;
        }
      }
        Group.update({_id: Group.findOne({name: groupName})._id}, {$push: {users: userName}});
    } else {
      console.log("cann't find a user");
    }
  }
});

Template.groupManager.helpers({
  group: function(){
    return Group.findOne({name: Meteor.user().profile.group});
  },
  logo: function(){
    return photos.findOne({groupLogo: Meteor.user().profile.group}).url();
  }

});
