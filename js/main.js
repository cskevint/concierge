$(function () {

  DataStore.trigger('init');
  new Storage({el: '#lockers'}).render();
  new LeaveBags({el: '#leave_bags'}).render();
  new PickUpBags({el: '#pick_up_bags'}).render();

  function fillLockers(size, total) {
    for (var i = 0; i < total; i++) {
      reserveLocker(size, i + 1);
    }
  }

  function resetLockers() {
    for (var key in window.dataStore.map) {
      clearLocker(key);
    }
    window.dataStore.counter = 100;
  }

  $("#fill").click(function () {
    var size = $("#sizes").val();
    if (size == 'ALL') {
      fillLockers('S', 1000);
      fillLockers('M', 1000);
      fillLockers('L', 1000);
    } else {
      fillLockers(size, 1000);
    }
    return false;
  });

  $("#random").click(function () {
    resetLockers();
    fillLockers('S', Math.random() * 1000);
    fillLockers('M', Math.random() * 1000);
    fillLockers('L', Math.random() * 1000);
    return false;
  });

  $("#clear").click(function () {
    resetLockers();
    return false;
  });

});
