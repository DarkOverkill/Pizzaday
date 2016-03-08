Template.groupManager.events({
  "change input[name='test']": function(event, template){
    //newFile = new FS.File(event.target.files);
    console.log(event.target.files[0]);
    newFile = new FS.File(event.target.files[0]);
    console.log(newFile);
        photos.insert(newFile);
  },

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
      Meteor.users.update(Meteor.userId(), {$set: {group: groupName}});
  } else {
      console.log('this groupe exsist');
    }
  },

  "click button[name='addUser']": function(event, template){
    var userName = $('input[name="userName"]').val();
    console.log(userName);
    if (Group.find({users: userName}).count() == 0){
      Group.update({_id: Group.findOne({name: 'Test'})._id}, {$push: {users: userName}});
    } else {
      console.log("user alredy in group");
    }
  }
});

Template.groupManager.helpers({
  members: function(){
    return Group.find({name: 'Dev'});
  }
});
