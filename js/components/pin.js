'use strict';
(function () {
  function Pin(data) {
    window.AbsctractComponent.call(this);
    this._data = data;
  }

  Pin.prototype = Object.create(window.AbsctractComponent.prototype);
  Pin.prototype.constructor = Pin;

  Pin.prototype._getTemplate = function () {
    var coordsPin = Object.assign({}, this._data.location);
    window.coords.convertFromLocation(coordsPin);
    var $template = document.querySelector('#pin').content.querySelector('.map__pin');
    var $pin = $template.cloneNode(true);
    $pin.style.left = coordsPin.x + 'px';
    $pin.style.top = coordsPin.y + 'px';
    $pin.querySelector('img').alt = this._data.offer.title;
    $pin.querySelector('img').src = this._data.author.avatar;
    $pin.tabindex = '0';
    return $pin;
  };

  window.Pin = Pin;
})();
