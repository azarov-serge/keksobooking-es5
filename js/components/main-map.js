'use strict';
(function () {
  var AbsctractElement = window.AbsctractElement;

  var MainMapClass = {
    MAIN_MAP: '.map',
    TOGGLE_CLASS: 'map--faded',
    MAP_FILTER_CONTAINER: '.map__filters-container',
    MAP_FILTER: '.map__filters',
  };

  function MainMapComponent() {
    AbsctractElement.call(this);
    this._SELECTOR = MainMapClass.MAIN_MAP;
    this._TOGGLE_CLASS = MainMapClass.TOGGLE_CLASS;
    this._$container = document;
    this._$mapFilterContainer = null;
    this._$mapFilter = null;
  }

  MainMapComponent.prototype = Object.create(AbsctractElement.prototype);
  MainMapComponent.prototype.constructor = MainMapComponent;

  MainMapComponent.prototype.getMapFilterContainer = function () {
    return this.getCustomElement(this._$mapFilterContainer, MainMapClass.MAP_FILTER_CONTAINER, this.getElement());
  };

  MainMapComponent.prototype.getMapFilter = function () {
    return this.getCustomElement(this._$mapFilter, MainMapClass.MAP_FILTER, this.getMapFilterContainer());
  };

  window.MainMapComponent = MainMapComponent;
})();
