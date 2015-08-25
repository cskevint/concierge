describe("DataStore", function() {

  describe("when initialized", function() {
    beforeEach(function () {
      DataStore.trigger('init');
    });

    it("it should have 1000 lockers in each array", function () {
      expect(DataStore['S'].length).toBe(DataStore.totalPerSize);
      expect(DataStore['M'].length).toBe(DataStore.totalPerSize);
      expect(DataStore['L'].length).toBe(DataStore.totalPerSize);
    });

    it("it should have an empty map of tickets", function () {
      expect(_.isEmpty(DataStore.map)).toBe(true);
    });

  });

  describe("when 1 bag is left of each size [S, M, L]", function() {
    beforeEach(function () {
      DataStore.trigger('init');
      DataStore.trigger('leave', 'S');
      DataStore.trigger('leave', 'M');
      DataStore.trigger('leave', 'L');
    });

    it("it should have 1 filled locker in each array", function () {
      expect(_.compact(DataStore['S']).length).toBe(1);
      expect(_.compact(DataStore['M']).length).toBe(1);
      expect(_.compact(DataStore['L']).length).toBe(1);
    });

    it("it should have 3 tickets in the map", function () {
      expect(_.keys(DataStore.map).length).toBe(3);
    });

    it("it should have 3 valid tickets in the map", function () {
      expect(DataStore.map[100]).toBe('S1');
      expect(DataStore.map[101]).toBe('M1');
      expect(DataStore.map[102]).toBe('L1');
    });

  });

  describe("when 1 bag is picked up of each size [S, M, L]", function() {
    beforeEach(function () {
      DataStore.trigger('init');
      DataStore.trigger('leave', 'S');
      DataStore.trigger('leave', 'M');
      DataStore.trigger('leave', 'L');
      DataStore.trigger('pickup', 100);
      DataStore.trigger('pickup', 101);
      DataStore.trigger('pickup', 102);
    });

    it("it should have no filled lockers in each array", function () {
      expect(_.compact(DataStore['S']).length).toBe(0);
      expect(_.compact(DataStore['M']).length).toBe(0);
      expect(_.compact(DataStore['L']).length).toBe(0);
    });

    it("it should have 3 ticket stubs in the map", function () {
      expect(_.keys(DataStore.map).length).toBe(3);
    });

    it("it should have 0 filled lockers in the map", function () {
      expect(_.compact(_.values(DataStore.map)).length).toBe(0);
    });

  });
});
