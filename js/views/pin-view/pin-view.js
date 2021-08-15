'use strict';
(function () {
  // Import views
  var AbsctractView = window.AbsctractView;

  // Import utils
  var convertToMapCoords = window.CoordsUtils.convertToMapCoords;

  // Import constatnts
  var DEFAULT_AVATAR = window.offer.DEFAULT_AVATAR;
  // ----- * -----

  function PinView(order) {
    AbsctractView.call(this);
    this._order = order;

    this._handleClick = this._handleClick.bind(this);
  }

  PinView.prototype = Object.create(AbsctractView.prototype);
  PinView.prototype.constructor = PinView;

  PinView.prototype._getTemplate = function () {
    var coordsPin = convertToMapCoords(this._order.location);
    var avatar = this._order.author.avatar || DEFAULT_AVATAR;

    return (
      '<button type="button" ' +
        'class="map__pin" ' +
        'style="' +
        'left: ' + coordsPin.x + 'px; ' +
        'top: ' + coordsPin.y + 'px;"' +
      '>' +
      '<img src="' + avatar + '" width="40" height="40" ' +
        'draggable="false" alt="Метка объявления"' +
      '>' +
      '</button>'
    );
  };

  PinView.prototype.setClickHandler = function (handler) {
    this._callback.pinClick = handler;
    this.getElement().addEventListener('click', this._handleClick);
  };

  PinView.prototype._handleClick = function (evt) {
    evt.preventDefault();

    this._callback.pinClick(this._order);
  };

  window.PinView = PinView;
})();
