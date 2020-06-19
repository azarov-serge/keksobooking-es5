'use strict';
(function () {
  var AbsctractElement = window.AbsctractElement;

  var MapPinsSelector = {
    MAP_PINS: '.map__pins',
    MAIN_PIN: '.map__pin--main',
  };

  function MapPinsComponent($container) {
    AbsctractElement.call(this);
    this._SELECTOR = MapPinsSelector.MAP_PINS;
    this._$container = $container || document;
    this._$mainPin = null;
    this.mainPinClickHandler = null;
    this.mainPinKeyDownHandler = null;
  }

  MapPinsComponent.prototype = Object.create(AbsctractElement.prototype);
  MapPinsComponent.prototype.constructor = MapPinsComponent;

  MapPinsComponent.prototype.getMainPin = function () {
    return this.getCustomElement(this._$mainPin, MapPinsSelector.MAIN_PIN, this.getElement());
  };

  MapPinsComponent.prototype.addMainMapListeners = function () {
    this.getElement().addEventListener('click', this.mainPinClickHandler);
    this.getElement().addEventListener('keydown', this.mainPinKeyDownHandler);
  };

  MapPinsComponent.prototype.removeMainMapListeners = function () {
    this.getElement().removeEventListener('click', this.mainPinClickHandler);
    this.getElement().removeEventListener('keydown', this.mainPinKeyDownHandler);
  };

  window.MapPinsComponent = MapPinsComponent;
})();
