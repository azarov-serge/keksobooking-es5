'use strict';
(function () {
  var AbsctractView = window.AbsctractView;

  var convertToMapCoords = window.CoordsUtils.convertToMapCoords;

  function PinView(order) {
    AbsctractView.call(this);
    this._order = order;
  }

  PinView.prototype = Object.create(AbsctractView.prototype);
  PinView.prototype.constructor = PinView;

  PinView.prototype._getTemplate = function () {
    var coordsPin = convertToMapCoords(this._order.location);
    var avatar = this._order.author.avatar || 'img/avatars/default.png';

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

  window.PinView = PinView;
})();
