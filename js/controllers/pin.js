'use strict';
(function () {
  function PinController(pin, mainMap) {
    this._pin = pin;
    this._mainMap = mainMap;
  }

  PinController.prototype.activate = function () {
    this._pin.setOnClickPin(this._onClickPin.bind(this));
  };

  PinController.prototype._onClickPin = function () {
    this._mainMap.renderCard(this._pin.getCard());
    this._pin.getCard().setOnCloseCard(this._onCloseCard.bind(this));
  };

  PinController.prototype._onCloseCard = function () {
    this._mainMap.removeCard();
  };

  window.PinController = PinController;
})();
