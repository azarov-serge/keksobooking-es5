'use strict';
(function () {
  var Coords = window.Coords;

  var Default = {
    MAIN_PIN_TOP: 570,
    MAIN_PIN_LEFT: 357,
  };
  function MapPinsController(mapPinsComponent, ordersModel) {
    this._mapPinsComponent = mapPinsComponent;
    this._ordersModel = ordersModel;
    this._pins = null;
    this.activePin = null;
    this._activeCard = null;
  }

  MapPinsController.prototype.setDefaultMainPin = function () {
    this._mapPinsComponent.getMainPin().style.left = Default.MAIN_PIN_LEFT + 'px';
    this._mapPinsComponent.getMainPin().style.top = Default.MAIN_PIN_TOP + 'px';
  };

  MapPinsController.prototype.getMainPinDefaultCoords = function () {
    return {
      x: Math.floor(Default.MAIN_PIN_LEFT + this._mapPinsComponent.getMainPin().offsetWidth / 2),
      y: Math.floor(Default.MAIN_PIN_TOP + this._mapPinsComponent.getMainPin().offsetHeight / 2),
    };
  };

  MapPinsController.prototype.getMainPinCoords = function () {
    return Coords.convertToCoords(
        this._mapPinsComponent.getMainPin().style.left,
        this._mapPinsComponent.getMainPin().style.top
    );
  };

  window.MapPinsController = MapPinsController;
})();
