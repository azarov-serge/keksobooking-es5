'use strict';
(function () {
  var AbsctractElement = window.AbsctractElement;

  var MainMapSelector = {
    MAIN_MAP: '.map',
    TOGGLE_CLASS: 'map--faded',
    MAP_FILTER_CONTAINER: '.map__filters-container',
    MAP_FILTER: '.map__filters',
  };

  function MainMapComponent() {
    AbsctractElement.call(this);
    this._SELECTOR = MainMapSelector.MAIN_MAP;
    this._TOGGLE_CLASS = MainMapSelector.TOGGLE_CLASS;
    this._$container = document;
    this._$mapFilterContainer = null;
    this._$mapFilter = null;
  }

  MainMapComponent.prototype = Object.create(AbsctractElement.prototype);
  MainMapComponent.prototype.constructor = MainMapComponent;

  MainMapComponent.prototype.getMapFilterContainer = function () {
    return this._getCustomElement(this._$mapFilterContainer, MainMapSelector.MAP_FILTER_CONTAINER, this.getElement());
  };

  MainMapComponent.prototype.getMapFilter = function () {
    return this._getCustomElement(this._$mapFilter, MainMapSelector.MAP_FILTER, this.getMapFilterContainer());
  };

  window.MainMapComponent = MainMapComponent;
})();
