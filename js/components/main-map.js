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
    this._$mapFilterContainer = null;
    this._$mapFilterForm = null;
    this._$mapFilters = null;
  }

  MainMapComponent.prototype = Object.create(AbsctractElement.prototype);
  MainMapComponent.prototype.constructor = MainMapComponent;

  MainMapComponent.prototype.getMapFilterContainer = function () {
    return this._getCustomElement(this._$mapFilterContainer, MainMapSelector.MAP_FILTER_CONTAINER, this.getElement());
  };

  MainMapComponent.prototype.getMapFiltersForm = function () {
    return this._getCustomElement(this._$mapFilterForm, MainMapSelector.MAP_FILTERS_FORM, this.getMapFilterContainer());
  };

  MainMapComponent.prototype._getMapFilters = function () {
    return this._getCustomElements(this._$mapFilters, MainMapSelector.MAP_FILTER, this.getMapFiltersForm());
  };

  MainMapComponent.prototype.toggleStateMapFilter = function () {
    this._getMapFilters().forEach(function ($filter) {
      $filter.disabled = !$filter.disabled;
    });
  };

  MainMapComponent.prototype.isMapFilterActivate = function () {
    return !this._getMapFilters()[0].disabled;
  };

  window.MainMapComponent = MainMapComponent;
})();
