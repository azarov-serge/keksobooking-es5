'use strict';
(function () {
  function Pins() {
    window.AbsctractComponent.call(this);
  }

  Pins.prototype = Object.create(window.AbsctractComponent.prototype);
  Pins.prototype.constructor = Pins;

  Pins.prototype.getElement = function () {
    if (!this._element) {
      this._element = document.querySelector('.map__pins');
    }

    return this._element;
  };

  window.Pins = Pins;
})();
