'use strict';
(function () {
  function MainPin(pin) {
    window.AbsctractComponent.call(this);
    this._pin = pin;
    this.onMousedown = null;
  }

  MainPin.prototype = Object.create(window.AbsctractComponent.prototype);
  MainPin.prototype.constructor = MainPin;

  MainPin.prototype.getElement = function () {
    if (!this._element) {
      this._element = document.querySelector('.map__pin--main');
    }

    return this._element;
  };

  window.MainPin = MainPin;
})();
