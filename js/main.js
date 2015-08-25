$(function () {

  DataStore.trigger('init');

  new Storage({
    el: '#lockers'
  }).render();

  new LeaveBags({
    el: '#leave_bags'
  }).render();

  new PickUpBags({
    el: '#pick_up_bags'
  }).render();

  new Testing({
    el: '#testing'
  }).render();

});
