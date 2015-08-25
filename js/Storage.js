var Storage = Backbone.View.extend({

  initialize: function () {
    this.cssMap = {
      'S': 'small',
      'M': 'medium',
      'L': 'large'
    };
    this.listenTo(DataStore, 'reserved', this.reserveLocker);
    this.listenTo(DataStore, 'cleared', this.clearLocker);
    this.listenTo(DataStore, 'filled', this.fillLockers);
  },

  render: function () {
    var innerHTML = "";
    innerHTML += this.generateLockers('S', DataStore.totalPerSize, 200);
    innerHTML += this.generateLockers('M', DataStore.totalPerSize, 100);
    innerHTML += this.generateLockers('L', DataStore.totalPerSize, 50);
    this.$el.html(innerHTML).addClass('storage');
  },

  events: {},

  generateLockers: function (size, total, perRow) {
    var result = "";
    for (var i = 0; i < total; i++) {
      var key = size + (i + 1);
      result += "<div id='" + key + "' class='locker " + this.cssMap[size] + "'></div>";
      if (i != 0 && (i + 1) % perRow == 0) {
        result += '<div class="divider"></div>';
      }
    }
    result += '<div class="divider"></div>';
    return result;
  },

  reserveLocker: function (locker) {
    this.$el.find("#" + locker.key).addClass('filled');
  },

  clearLocker: function (locker) {
    this.$el.find("#" + locker.key).removeClass('filled');
  },

  fillLockers: function (info) {
    for (var i = 0; i < DataStore.totalPerSize; i++) {
      var key = info.size + (i + 1)
        , locker = this.$el.find("#" + key);
      if (i < info.count) {
        locker.addClass('filled');
      } else {
        locker.removeClass('filled');
      }
    }
  }
});