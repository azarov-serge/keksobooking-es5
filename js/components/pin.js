'use strict';
(function () {
  var AbsctractComponent = window.AbsctractComponent;
  var CoordsUtil = window.CoordsUtil;

  function PinComponent(pinData, index) {
    AbsctractComponent.call(this);
    this._pinData = pinData;
    this._index = index;
    this._TOGGLE_CLASS = 'map__pin--active';
  }

  PinComponent.prototype = Object.create(AbsctractComponent.prototype);
  PinComponent.prototype.constructor = PinComponent;

  PinComponent.prototype._getTemplate = function () {
    var coordsPin = Object.assign({}, this._pinData.location);
    coordsPin = CoordsUtil.convertFromLocation(coordsPin);
    var $template = document.querySelector('#pin').content.querySelector('.map__pin');
    var $pin = $template.cloneNode(true);
    $pin.style.left = coordsPin.x + 'px';
    $pin.style.top = coordsPin.y + 'px';
    $pin.querySelector('img').alt = this._pinData.offer.title;
    $pin.querySelector('img').src = this._pinData.author.avatar;
    $pin.tabindex = '0';
    $pin.dataset.orderIndex = this._index;
    return $pin;
  };

  window.PinComponent = PinComponent;
})();
