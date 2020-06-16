'use strict';
(function () {
  function Pin(data) {
    window.AbsctractComponent.call(this);
    this._data = data;
    this._card = null;
    this.onClickPin = null;
  }

  Pin.prototype = Object.create(window.AbsctractComponent.prototype);
  Pin.prototype.constructor = Pin;

  Pin.prototype._getTemplate = function () {
    var coordsPin = Object.assign({}, this._data.location);
    coordsPin = window.coords.convertFromLocation(coordsPin);
    var $template = document.querySelector('#pin').content.querySelector('.map__pin');
    var $pin = $template.cloneNode(true);
    $pin.style.left = coordsPin.x + 'px';
    $pin.style.top = coordsPin.y + 'px';
    $pin.querySelector('img').alt = this._data.offer.title;
    $pin.querySelector('img').src = this._data.author.avatar;
    $pin.tabindex = '0';
    return $pin;
  };

  Pin.prototype.getCard = function () {
    if (!this._card) {
      this._card = new window.Card(this._data);
    }

    return this._card;
  };

  Pin.prototype.setOnClickPin = function (onClickPin) {
    this.getElement().addEventListener('click', onClickPin);
  };

  window.Pin = Pin;
})();
