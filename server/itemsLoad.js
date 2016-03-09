if (ItemsData.find().count() === 0) {
  ItemsData.insert({
    name: 'pizza',
    price: '42.50'
  });

  ItemsData.insert({
    name: 'cola',
    price: '12.00'
  });

  ItemsData.insert({
    name: 'Frentch fries',
    price: '11.20'
});

  ItemsData.insert({
    name: 'Tomatp juice',
    price: '15.70'
});
}

//Meteor.users.update("QGEK4vC5Q5QLa5nxG", {$set: {profile: {group: "developers"}}});

//Meteor.users.remove("sJPXgpi8qt6MaGSPD");
var photoStore = new FS.Store.GridFS("my_photos", {path: "~/images"});

photos = new FS.Collection("my_photos", {
    stores: [photoStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
      }
});

Accounts.onCreateUser(function(options, user){
profile = {
  invite: "",
  fromUser: "",
  toGroup: "",
  group: ""
};
  user.profile = profile;
  return user;
});
Meteor.methods({
  addInvite: function(_toUser, _fromUser, _toGroup){
    var userId = Meteor.users.findOne({username: _toUser})._id;
    Meteor.users.update({_id: userId}, {$set: {"profile.invite": true, "profile.fromUser": _fromUser, "profile.toGroup": _toGroup}});
    console.log('ok');
  }
});

console.log('ok');
