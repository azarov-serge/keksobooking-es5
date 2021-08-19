'use strict';
(function () {
  // Import views
  var AbsctractView = window.AbsctractView;

  // Import utils
  var convertToMapCoords = window.coordsUtils.convertToMapCoords;

  // Import constatnts
  var DEFAULT_AVATAR = window.order.DEFAULT_AVATAR;
  // ----- * -----

  function PinView(args) {
    AbsctractView.call(this);
    this._order = args.order;
    this._callback.onClick = args.onClick;

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

  PinView.prototype._handleClick = function (evt) {
    evt.preventDefault();

    this._callback.onClick(this._order);
  };

  window.PinView = PinView;
})();
