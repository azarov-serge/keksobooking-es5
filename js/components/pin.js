'use strict';
(function () {
  var AbsctractComponent = window.AbsctractComponent;
  var coordsUtil = window.coordsUtil;

  var PinSelector = {
    TEMPLATE: '#pin',
    PIN: '.map__pin',
    AVATAR: 'img',
    TOGGLE_CLASS: 'map__pin--active',
  };

  var $template = document.querySelector(PinSelector.TEMPLATE).content.querySelector(PinSelector.PIN);

  function PinComponent(order) {
    AbsctractComponent.call(this);
    this._order = order;
    this.id = order.id;
    this._TOGGLE_CLASS = PinSelector.TOGGLE_CLASS;
  }

  PinComponent.prototype = Object.create(AbsctractComponent.prototype);
  PinComponent.prototype.constructor = PinComponent;

  PinComponent.prototype._getTemplate = function () {
    var coordsPin = Object.assign({}, this._order.location);
    coordsPin = coordsUtil.convertFromLocation(coordsPin);
    var $pin = $template.cloneNode(true);
    $pin.style.left = coordsPin.x + 'px';
    $pin.style.top = coordsPin.y + 'px';
    var $pinAvatar = $pin.querySelector(PinSelector.AVATAR);
    $pinAvatar.alt = this._order.offer.title;
    $pinAvatar.src = this._order.author.avatar;
    $pin.tabindex = '0';
    $pin.dataset.orderId = this.id;
    return $pin;
  };

  window.PinComponent = PinComponent;
})();
