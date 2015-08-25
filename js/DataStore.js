var DataStore = {
  'S': [],
  'M': [],
  'L': [],
  map: {},
  counter: 100,
  totalPerSize: 1000,
  nextSize: {
    'L': null,
    'M': 'L',
    'S': 'M'
  }
};

DataStore.lowestIndex = function (size) {
  if (this[size] == null) {
    return -1;
  }
  for (var i = 0; i < this.totalPerSize; i++) {
    if (this[size][i] == null) {
      return i;
    }
  }
  return -1;
};

DataStore.findLocker = function (size) {
  var index = this.lowestIndex(size);
  while (index < 0 && this.nextSize[size] != null) {
    size = this.nextSize[size];
    index = this.lowestIndex(size);
  }
  if (index >= 0) {
    return {
      size: size,
      number: index + 1,
      key: size + (index + 1)
    };
  } else {
    return null;
  }
};

DataStore.reserveLocker = function (locker) {
  var ticket = this.counter++;
  this.map[ticket] = locker.key;
  this[locker.size][locker.number - 1] = 1;
  return ticket;
};

DataStore.invalidTicket = function (ticket) {
  return ticket === null || ticket.length == 0 || isNaN(parseInt(ticket, 10)) || this.map[ticket] === undefined;
};

//DataStore.isReserved = function (ticket) {
//  var obj = this.identifyLocker(ticket);
//  return obj && this.map[ticket] !== null && this[obj.size][obj.number - 1] !== null;
//};

DataStore.identifyLocker = function (ticket) {
  var converted = this.map[ticket];
  if (converted) {
    var size = converted.substring(0, 1)
      , number = parseInt(converted.substring(1), 10);
    return {
      size: size,
      number: number,
      key: size + number
    };
  }
  return null;
};

DataStore.clearLocker = function (ticket) {
  var locker = this.identifyLocker(ticket);
  if (locker) {
    this.map[ticket] = null;
    this[locker.size][locker.number - 1] = null;
    return _.extend(locker, {contents: true});
  }
  return {
    contents: false
  };
};

_.extend(DataStore, Backbone.Events);

DataStore.on("init", function () {
  var self = this;
  _.each(['S', 'M', 'L'], function (size) {
    self[size] = [];
    for (var i = 0; i < this.totalPerSize; i++) {
      self[size].push(null);
    }
  });
  this.map = {};
  this.counter = 100;
});

DataStore.on("leave", function (size) {
  var locker = this.findLocker(size);
  if (locker) {
    var ticket = this.reserveLocker(locker);
    DataStore.trigger("reserved", _.extend({ticket: ticket}, locker));
  } else {
    DataStore.trigger("full");
  }
});

DataStore.on("pickup", function (ticket) {
  if (this.invalidTicket(ticket)) {
    DataStore.trigger("invalid", ticket);
  } else {
    var locker = this.clearLocker(ticket);
    DataStore.trigger("cleared", _.extend({ticket: ticket}, locker));
  }
});
