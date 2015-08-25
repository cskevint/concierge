var Storage = Backbone.View.extend({

  initialize: function () {
    this.cssMap = {
      'S': 'small',
      'M': 'medium',
      'L': 'large'
    };
    this.listenTo(DataStore, 'reserved', this.reserveLocker);
    this.listenTo(DataStore, 'cleared', this.clearLocker);
  },

  render: function () {
    var innerHTML = "";
    innerHTML += this.generateLockers('S', 1000, 200);
    innerHTML += this.generateLockers('M', 1000, 100);
    innerHTML += this.generateLockers('L', 1000, 50);
    this.$el.html(innerHTML).addClass('storage');
  },

  events: {},

  generateLockers: function (size, total, perRow) {
    var result = "";
    for (var i = 0; i < total; i++) {
      var key = size + (i + 1);
      result += "<div id='" + key + "' class='locker " + this.cssMap[size] + "'></div>";
      if (i != 0 && (i + 1) % perRow == 0) {
        result += '<div style="clear:both"></div>';
      }
    }
    result += '<div style="clear:both; height: 2px;"></div>';
    return result;
  },

  reserveLocker:function(locker) {
    this.$el.find("#"+locker.key).css('background-color','red');
  },

  clearLocker: function(locker) {
    this.$el.find("#" + locker.key).css('background-color', 'white');
  }

});