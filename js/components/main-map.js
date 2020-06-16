'use strict';
(function () {
  var MainMapClass = {
    MAIN_MAP: '.map',
    TOGGLE_CLASS: 'map--faded',
    MAIN_PIN: '.map__pin--main',
  };

  function MainMapComponent() {
    window.AbsctractElement.call(this);
    this._SELECTOR = MainMapClass.MAIN_MAP;
    this._TOGGLE_CLASS = MainMapClass.TOGGLE_CLASS;
    this._$container = document;
    this._$mainPin = null;
  }

  MainMapComponent.prototype = Object.create(window.AbsctractElement.prototype);
  MainMapComponent.prototype.constructor = MainMapComponent;

  window.MainMapComponent = MainMapComponent;
})();
