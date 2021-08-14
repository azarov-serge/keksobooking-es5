'use strict';
(function () {
  // Import
  var Observer = window.Observer;

  var MapFiltersName = window.MapFilters.MapFiltersName;
  var FILTER_ALL = window.MapFilters.FILTER_ALL;
  // ----- * -----


  var defaultFilters = {};

  Object.values(MapFiltersName).forEach(function (filterName) {
    defaultFilters[filterName] = FILTER_ALL;
  });


  function FiltersModel() {
    Observer.call(this);
    this._filters = defaultFilters;
    this._features = [];
  }

  FiltersModel.prototype = Object.create(Observer.prototype);
  FiltersModel.prototype.constructor = FiltersModel;

  FiltersModel.prototype.setFilters = function (actionType, orders) {
    this._filters = orders;
    this.notify(actionType);
  };

  FiltersModel.prototype.getFilters = function () {
    return this._filters;
  };

  FiltersModel.prototype.setFeatures = function (actionType, features) {
    this._features = features;
    this.notify(actionType);
  };

  FiltersModel.prototype.getFeatures = function () {
    return this._features;
  };

  window.FiltersModel = FiltersModel;
})();
