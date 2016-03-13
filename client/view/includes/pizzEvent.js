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
  },
  "click button#addToChart": function(event, template){
    var eventId = this._id;
    var itemId = $('select[name="items-' + eventId + '"] option:selected').data("itemid");
    var itemCount = $('input[name="itemCount-' + eventId + '"]').val();
    PizzaEvent.update({_id: eventId}, {$push: {order: {"itemId": itemId, "count": itemCount, "user": Meteor.user().username}}});
    //console.log(ItemsData.findOne({_id: itemId}).name + "\t" + itemCount);
  },

  "click button#seeOrder" : function(event, template){
    $('input[name="eventIdtoSeeOrder"]').val(this._id);
    //Template.pizzaEvent.Foo("event");
  }
});
Template.pizzaEvent.helpers({
  events: function(){
    return PizzaEvent.find({group: Meteor.user().profile.group}, {sort: {onDate: 1}});
  },
  groupMenu: function(){
    return ItemsData.find({group: Meteor.user().profile.group});
  },
  orderedItems : function(){
    //var eventId = $('input[name="eventIdtoSeeOrder"]').val();
    //var returnOrder = [];
    //var order = PizzaEvent.find({_id: eventId, group: Meteor.user().profile.group}, {sort: {onDate: 1}}).order;
    //console.log(order.length);
    //Template.pizzaEvent.Foo("helper");
    //for (var i = 0; i < order.length; i++){
    //
    //}
  }
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
/*
Template.pizzaEvent.Foo = function(a){
  console.log(a);
};

Template.pizzaEvent.created = function (a) {

  Template.pizzaEvent.Foo(a);
};
*/
Template.registerHelper("compare", function(v1, v2){
  if (typeof v1 === 'object' && typeof v2 === 'object') {
    return _.isEqual(v1, v2); // do a object comparison
  } else {
    return v1 === v2;
  }
});
