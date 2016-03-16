if (ItemsData.find().count() === 0) {
  ItemsData.insert({
    name: 'pizza',
    price: '42.50',
    group: ""
  });

  ItemsData.insert({
    name: 'cola',
    price: '12.00',
    group: ""
  });

  ItemsData.insert({
    name: 'Frentch fries',
    price: '11.20',
    group: ""
});

  ItemsData.insert({
    name: 'Tomatp juice',
    price: '15.70',
    group: ""
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
/*
Meteor.startup( function() {
  process.env.MAIL_URL = "smtp://postmaster%40<your-mailgun-address>.mailgun.org:password@smtp.mailgun.org:587";
});*/

Meteor.startup(function () {
  smtp = {
    username: 'pizzadaytest',
    password: 'testtask',
    server:   'smtp.gmail.com',
    port: 587
  };
  process.env.MAIL_URL = 'smtp://' + smtp.username + ':' + smtp.password + '@' + smtp.server + ':' + smtp.port;
  //process.env.MAIL_URL = "smtp://pizzadaytest:testtask@smtp.gmail.com:587/";
});
Meteor.methods({
  sendEmail: function (to, event, text) {

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
  
    this.unblock();
    Email.send({
          to: Meteor.users.findOne({username: to}).emails[0].address,
          from: 'pizzadaytest@gmail.com',
          subject: 'Order on event - ' + event,
          text: text
        });
  }
});


console.log('ok');
