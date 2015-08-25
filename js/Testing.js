var Testing = Backbone.View.extend({

  initialize: function () {
  },

  render: function () {
    this.$el.html(this.template()).addClass("testing");
  },

  events: {
    'click #fill': 'fill',
    'click #random': 'random',
    'click #reset': 'reset'
  },

  template: _.template([
    '<h2>Testing</h2>',

    '<form class="form-inline">',
      '<p class="form-control-static">Fill:&nbsp;</p>',

      '<div class="form-group">',
        '<select class="form-control" id="sizes">',
          '<option value="S">Small</option>',
          '<option value="M">Medium</option>',
          '<option value="L">Large</option>',
          '<option value="ALL">All</option>',
        '</select>',
      '</div>',
      '<button type="submit" class="btn btn-default" role="button" id="fill">Fill &raquo;</button>',

    '</form>',

    '<button type="submit" class="btn btn-default" role="button" id="random">Randomize &raquo;</button>',
    '<button type="submit" class="btn btn-default" role="button" id="reset">Reset &raquo;</button>'
  ].join("")),

  fill: function (event) {
    DataStore.trigger("fill", this.$el.find('#sizes').val());
    event.preventDefault();
  },

  random: function (event) {
    DataStore.trigger("random");
    event.preventDefault();
  },

  reset: function (event) {
    DataStore.trigger("reset");
    event.preventDefault();
  }

});