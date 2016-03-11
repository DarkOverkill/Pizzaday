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
       eventCreator: Meteor.user().username});
  }
});
Template.pizzaEvent.helpers({
  events: function(){
    PizzaEvent.find({group: Meteor.user().profile.group});
  },
  groupMenu: function(){
    return ItemsData.find({group: /*Meteor.user().profile.group*/""});
  }
});
