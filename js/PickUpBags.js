var PickUpBags = Backbone.View.extend({

  initialize: function () {
    this.sizesText = {
      'S': 'Small',
      'M': 'Medium',
      'L': 'Large'
    };
    this.listenTo(DataStore, 'cleared', this.clearLocker);
    this.listenTo(DataStore, 'invalid', this.invalidTicket);
  },

  render: function () {
    this.$el.html(this.template()).addClass('pickUpBags');
  },

  events: {
    'click #pickup': 'pickUpBag'
  },

  template: _.template([
    '<h2>Pick up Bag</h2>',

    '<form class="form-inline">',
      '<p class="form-control-static">Ticket number:&nbsp;</p>',

      '<div class="form-group">',
        '<input class="form-control" type="text" id="ticket" style="width:100px"/>',
      '</div>',
      '<button type="submit" class="btn btn-default" role="button" id="pickup">Pick up bag &raquo;</button>',
    '</form>',

    '<div class="well message">',
      'Please enter a ticket number.',
    '</div>'
  ].join("")),

  messageTpl: _.template('Ticket <%= ticket %> was in size: <span class="locker_size"><%= sizeText %></span>'),

  pickUpBag: function(event) {
    var $ticket = this.$el.find('#ticket');
    DataStore.trigger("pickup", $ticket.val());
    $ticket.val('');
    event.preventDefault();
  },

  clearLocker:function(locker) {
    if(locker.contents) {
      var data = _.extend({sizeText:this.sizesText[locker.size]}, locker);
      this.$el.find(".message").html(this.messageTpl(data));
    } else {
      this.$el.find(".message").html('Your bags were already picked up.');
    }
  },

  invalidTicket: function(ticket) {
    this.$el.find(".message").html('Your ticket is invalid.');
  }

});