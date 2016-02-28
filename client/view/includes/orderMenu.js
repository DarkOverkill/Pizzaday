Template.orderMenu.helpers({
  items: function() {
    return ItemsData.find();
  }
});

Template.orderMenu.events({
  "click button[name='edit']": function(event, template){
     console.log(this);
     id = this._id;
     $("input#itemName").val(this.name);
     $("input#itemPrice").val(this.price);
  },
  "click button[name='saveChange']": function(event, template){
    console.log(id);
    ItemsData.update(id, {$set:{ name: $("input#itemName").val(), price: parseFloat($("input#itemPrice").val())
    }});
  }
});
