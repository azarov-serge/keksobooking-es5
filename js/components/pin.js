'use strict';
(function () {
  var Coords = window.Coords;

  function PinComponent(data) {
    window.AbsctractComponent.call(this);
    this._data = data;
    this._card = null;
    this._TOGGLE_CLASS = 'map__pin--active';
    this.onClickPin = null;
  }

  PinComponent.prototype = Object.create(window.AbsctractComponent.prototype);
  PinComponent.prototype.constructor = PinComponent;

  PinComponent.prototype._getTemplate = function () {
    var coordsPin = Object.assign({}, this._data.location);
    coordsPin = Coords.convertFromLocation(coordsPin);
    var $template = document.querySelector('#pin').content.querySelector('.map__pin');
    var $pin = $template.cloneNode(true);
    $pin.style.left = coordsPin.x + 'px';
    $pin.style.top = coordsPin.y + 'px';
    $pin.querySelector('img').alt = this._data.offer.title;
    $pin.querySelector('img').src = this._data.author.avatar;
    $pin.tabindex = '0';
    return $pin;
  };

  PinComponent.prototype.getCard = function () {
    if (!this._card) {
      this._card = new window.CardComponent(this._data);
    }

    return this._card;
  };

  PinComponent.prototype.setOnClickPin = function (onClickPin) {
    this.getElement().addEventListener('click', onClickPin);
  };

  window.PinComponent = PinComponent;
})();
