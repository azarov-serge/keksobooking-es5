'use strict';
(function () {
  function Pin(pin) {
    window.AbsctractComponent.call(this);
    this._pin = pin;
  }

  Pin.prototype = Object.create(window.AbsctractComponent.prototype);
  Pin.prototype.constructor = Pin;

  Pin.prototype.getElement = function () {
    if (!this._element) {
      this._template = document.querySelector('#pin').content.querySelector('.map__pin');
      this._element = this._template.cloneNode(true);
      this._element.style.left = String(this._pin.location.x) + 'px';
      this._element.style.top = String(this._pin.location.y) + 'px';
      this._element.querySelector('img').alt = this._pin.offer.title;
      this._element.querySelector('img').src = this._pin.author.avatar;
      this._element.tabindex = '0';
    }
    return this._element;
  };

  window.Pin = Pin;
})();
