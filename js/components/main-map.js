'use strict';
(function () {
  var AbsctractElement = window.AbsctractElement;

  var MainMapSelector = {
    MAIN_MAP: '.map',
    TOGGLE_CLASS: 'map--faded',
    MAP_FILTER_CONTAINER: '.map__filters-container',
    MAP_FILTERS_FORM: '.map__filters',
    MAP_FILTER: '.map__filter',
  };

  function MainMapComponent() {
    AbsctractElement.call(this);
    this._SELECTOR = MainMapSelector.MAIN_MAP;
    this._TOGGLE_CLASS = MainMapSelector.TOGGLE_CLASS;
    this._$container = document;
    this._$mapFiltersContainer = null;
    this._$mapFiltersForm = null;
    this._$mapFilters = null;
    this.mapFiltersHandler = null;
  }

  MainMapComponent.prototype = Object.create(AbsctractElement.prototype);
  MainMapComponent.prototype.constructor = MainMapComponent;

  MainMapComponent.prototype.getMapFiltersContainer = function () {
    return this._getCustomElement(this._$mapFiltersContainer, MainMapSelector.MAP_FILTER_CONTAINER, this.getElement());
  };

  MainMapComponent.prototype.getMapFiltersForm = function () {
    return this._getCustomElement(this._$mapFiltersForm, MainMapSelector.MAP_FILTERS_FORM, this.getMapFiltersContainer());
  };

  MainMapComponent.prototype.getMapFilters = function () {
    return this._getCustomElements(this._$mapFilters, MainMapSelector.MAP_FILTER, this.getMapFiltersForm());
  };

  MainMapComponent.prototype.toggleStateMapFilters = function () {
    this.getMapFilters().forEach(function ($filter) {
      $filter.disabled = !$filter.disabled;
    });
  };

  MainMapComponent.prototype.isMapFiltersActivate = function () {
    return !this.getMapFilters()[0].disabled;
  };

  MainMapComponent.prototype.addMapFiltersListener = function () {
    this.getMapFiltersForm().addEventListener('change', this.mapFiltersHandler);
  };

  MainMapComponent.prototype.removeMapFiltersListener = function () {
    this.getMapFiltersForm().removeEventListener('change', this.mapFiltersHandler);
  };

  window.MainMapComponent = MainMapComponent;
})();
