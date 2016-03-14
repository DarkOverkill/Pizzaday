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
    var eventId = this._id;
    var oldElem;
    var addRow;
    var elem = $('div[name="item"]');
    elem.html("");
    var item;
    var count, price, total = 0;
    var order = PizzaEvent.findOne({_id: eventId, group: Meteor.user().profile.group}, {sort: {onDate: 1}}).order;
    for (var i = 0; i < order.length; i++){
      if(order[i].user == Meteor.user().username){
        item = ItemsData.findOne({_id: order[i].itemId});
        count = parseInt(order[i].count);
        price = parseFloat(item.price);
        oldElem = elem.html();
        total += price*count;
        addRow = '<div class="row">'+ item.name + ' (' + price + '$) x ' + count + ' = ' + price*count + '$ </div>';
        elem.html(oldElem + addRow);
      }
    }
    elem = $('input[name="totalCost"]');
    elem.val("Total cost: " + total + " $");
  },

  "change select[name='orderStatus']": function(event, template){
    var orderStatus = $('select[data-eventId='+ this._id +']')[0].value;
    PizzaEvent.update({_id: this._id}, {$set: {status: orderStatus}});
  }
});
Template.pizzaEvent.helpers({
  events: function(){
    return PizzaEvent.find({group: Meteor.user().profile.group}, {sort: {onDate: 1}});
  },
  groupMenu: function(){
    return ItemsData.find({group: Meteor.user().profile.group});
  }
});

Template.registerHelper("compare", function(v1, v2){
  if (typeof v1 === 'object' && typeof v2 === 'object') {
    return _.isEqual(v1, v2); // do a object comparison
  } else {
    return v1 === v2;
  }
});
