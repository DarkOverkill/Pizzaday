Template.pizzaEvent.events({
  "click button[name='create']": function(event, template){
     var eventName = $('input#eventName').val();
     var onDate = new Date($('input#onDate').val());
     //console.log(eventName + "\t" + onDate);
     //$('input#onDate2').val(onDate.toISOString().split('T')[0]);
     PizzaEvent.insert({name: eventName,
       onDate: onDate.toISOString().split('T')[0],
       group: Meteor.user().profile.group,
       status: "ordering",
       eventCreator: Meteor.user().username,
       usersAccept: [Meteor.user().username],
       usersReject: [""]
     });
  }
});
Template.pizzaEvent.helpers({
  events: function(){
    return PizzaEvent.find({group: Meteor.user().profile.group});
  },
  groupMenu: function(){
    return ItemsData.find({group: Meteor.user().profile.group});
  },
  /*eventCreator: function(){
    var event = PizzaEvent.find({group: Meteor.user().profile.group}).fetch();
    var currUser = Meteor.user().username;
    var creators = [];
    for (var i =0; i < event.length; i++){
      creators[i] = event[i].eventCreator == currUser;
    }
    return creators;
  }*/
});
Template.registerHelper("compare", function(v1, v2){
  if (typeof v1 === 'object' && typeof v2 === 'object') {
    return _.isEqual(v1, v2); // do a object comparison
  } else {
    return v1 === v2;
  }
});
