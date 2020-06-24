'use strict';
(function () {
  var AbsctractComponent = window.AbsctractComponent;
  var CoordsUtil = window.CoordsUtil;

  var PinSelector = {
    TEMPLATE: '#pin',
    PIN: '.map__pin',
    AVATAR: 'img',
    TOGGLE_CLASS: 'map__pin--active',
  };

  function PinComponent(pinData, index) {
    AbsctractComponent.call(this);
    this._pinData = pinData;
    this._index = index;
    this._TOGGLE_CLASS = PinSelector.TOGGLE_CLASS;
  }

  PinComponent.prototype = Object.create(AbsctractComponent.prototype);
  PinComponent.prototype.constructor = PinComponent;

  PinComponent.prototype._getTemplate = function () {
    var coordsPin = Object.assign({}, this._pinData.location);
    coordsPin = CoordsUtil.convertFromLocation(coordsPin);
    var $template = document.querySelector(PinSelector.TEMPLATE).content.querySelector(PinSelector.PIN);
    var $pin = $template.cloneNode(true);
    $pin.style.left = coordsPin.x + 'px';
    $pin.style.top = coordsPin.y + 'px';
    $pin.querySelector(PinSelector.AVATAR).alt = this._pinData.offer.title;
    $pin.querySelector(PinSelector.AVATAR).src = this._pinData.author.avatar;
    $pin.tabindex = '0';
    $pin.dataset.orderIndex = this._index;
    return $pin;
  };

  window.PinComponent = PinComponent;
})();
