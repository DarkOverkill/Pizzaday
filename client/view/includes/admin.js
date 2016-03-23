Template.admin.events({
  "click input[name='clearDB']": function(event, template){
    Meteor.call("deleteAllFromDB");
  }
});
