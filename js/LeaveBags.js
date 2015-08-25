var LeaveBags = Backbone.View.extend({

  initialize: function () {
    this.listenTo(DataStore, 'reserved', this.reserveLocker);
    this.listenTo(DataStore, 'full', this.fullStorage);
  },

  render: function () {
    this.$el.html(this.template()).addClass("leaveBags");
  },

  events: {
    'click #leave': 'leaveBag'
  },

  template: _.template([
    '<h2>Leave Bags</h2>',
    '<form class="form-inline">',
      '<p class="form-control-static">Choose a size:&nbsp;</p>',

      '<div class="form-group">',
        '<select class="form-control" id="size">',
          '<option value="S">Small</option>',
          '<option value="M">Medium</option>',
          '<option value="L">Large</option>',
        '</select>',
      '</div>',
      '<button type="submit" class="btn btn-default" role="button" id="leave">Leave bags &raquo;</button>',
    '</form>',
    '<div class="well message">',
      'Select a size above to get a ticket.',
    '</div>'
  ].join("")),

  messageTpl: _.template('Your ticket number is: <span class="ticket"><%= ticket %></span>'),

  leaveBag: function (event) {
    DataStore.trigger("leave", this.$el.find('#size').val());
    event.preventDefault();
  },

  reserveLocker: function (locker) {
    this.$el.find(".message").html(this.messageTpl(locker));
  },

  fullStorage: function () {
    this.$el.find(".message").html('Storage is full. Please come back later.');
  }

});