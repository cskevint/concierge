$(function () {

  window.dataStore = {
    'S':[],
    'M':[],
    'L':[],
    counter: 100,
    map: {}
  };

  function generateLocker(size, index) {
    var sizeCSS = "width: 5px; height: 5px;";
    if (size == 'M') {
      sizeCSS = "width: 10px; height: 5px;";
    } else if (size == 'L') {
      sizeCSS = "width: 20px; height: 5px;";
    }
    return "<div id='" + size + index + "' style='" + sizeCSS + "border: 1px solid black; float: left'></div>";
  }

  function generateLockers(size, total, row) {
    var result = "";
    for (var i = 0; i < total; i++) {

      window.dataStore[size].push(null);

      result += generateLocker(size, (i + 1));
      if (i != 0 && (i + 1) % row == 0) {
        result += '<div style="clear:both"></div>';
      }
    }
    result += '<div style="clear:both; height: 2px;"></div>';
    return result;
  }

  function renderLockers() {
    var innerHTML = "";
    innerHTML += generateLockers('S', 1000, 200);
    innerHTML += generateLockers('M', 1000, 100);
    innerHTML += generateLockers('L', 1000, 50);
    $('#lockers').html(innerHTML);
  }

  renderLockers();

  var sizes = {
    'S' : 'Small',
    'M' : 'Medium',
    'L' : 'Large'
  };

  function nextSize(size) {
    if(size == 'L') {
      return null;
    }
    if(size == 'M') {
      return 'L';
    }
    if(size == 'S') {
      return 'M';
    }
  }

  function findLowest(size) {
    for(var i = 0; i < 1000; i++) {
      if(window.dataStore[size][i] == null) {
        return i;
      }
    }
    return -1;
  }

  function isReserved(ticket) {
    var obj = splitTicket(ticket);
    return obj && window.dataStore.map[ticket] !== null && window.dataStore[obj.size][obj.number-1] !== null;
  }

  function reserveLocker(size, number) {
    window.dataStore[size][number-1] = 1;
    var ticket = window.dataStore.counter++;
    window.dataStore.map[ticket] = size+number;
    $("#"+size+number).css('background-color','red');
    $("#new_ticket").text(ticket).parent().removeClass('hidden');
  }

  function clearLocker(ticket) {
    var obj = splitTicket(ticket);
    if(!obj) {
      return null;
    }
    window.dataStore[obj.size][obj.number-1] = null;
    $("#"+obj.size+obj.number).css('background-color','white');
    window.dataStore.map[ticket] = null;
    return obj.size;
  }

  function splitTicket(ticket) {
    var converted = window.dataStore.map[ticket];
    if(!converted) {
      return null;
    }
    return {
      size: converted.substring(0, 1),
      number: parseInt(converted.substring(1),10)
    }
  }

  $("#leave").click(function(){
    var size = $('#size').val();
    var index = findLowest(size);
    while(index < 0 && nextSize(size) != null) {
      size = nextSize(size);
      index = findLowest(size);
    }
    if(index >= 0) {
      reserveLocker(size, index+1);
    } else {
      console.log("FULL");
    }
    return false;
  });

  $("#pickup").click(function(){
    var ticket = $('#ticket').val();
    if(ticket === null && ticket.length === 0) {
      return false;
    }
    if(isReserved(ticket)) {
      var size = clearLocker(ticket);
      if(size) {
        $("#locker_size").text(sizes[size]).parent().removeClass('hidden');
      }
    } else {
      $("#locker_size").text("NOT FOUND").parent().removeClass('hidden');
    }
    return false;
  });

  function fillLockers(size, total) {
    for (var i = 0; i < total; i++) {
      reserveLocker(size, i+1);
    }
  }

  function resetLockers() {
    for (var key in window.dataStore.map) {
      clearLocker(key);
    }
    window.dataStore.counter = 100;
  }

  $("#fill").click(function(){
    var size = $("#sizes").val();
    if(size == 'ALL') {
      fillLockers('S', 1000);
      fillLockers('M', 1000);
      fillLockers('L', 1000);
    } else {
      fillLockers(size, 1000);
    }
    return false;
  });

  $("#random").click(function(){
    resetLockers();
    fillLockers('S', Math.random()*1000);
    fillLockers('M', Math.random()*1000);
    fillLockers('L', Math.random()*1000);
    return false;
  });

  $("#clear").click(function(){
    resetLockers();
    return false;
  });

});
