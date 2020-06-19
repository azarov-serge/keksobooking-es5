'use strict';
(function () {
  var AbsctractElement = window.AbsctractElement;

  var MapPinsClass = {
    MAP_PINS: '.map__pins',
    MAIN_PIN: '.map__pin--main',
  };

  function MapPinsComponent($container) {
    AbsctractElement.call(this);
    this._SELECTOR = MapPinsClass.MAP_PINS;
    this._$container = $container || document;
    this._$mainPin = null;
  }

  MapPinsComponent.prototype = Object.create(AbsctractElement.prototype);
  MapPinsComponent.prototype.constructor = MapPinsComponent;

  MapPinsComponent.prototype.getMainPin = function () {
    return this.getCustomElement(this._$mainPin, MapPinsClass.MAIN_PIN, this.getElement());
  };

  window.MapPinsComponent = MapPinsComponent;
})();
