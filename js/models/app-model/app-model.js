'use strict';
(function () {
  // Import
  var Observer = window.Observer;

  var AppState = window.AppState;
  // ----- * -----

  function AppModel() {
    Observer.call(this);
    this._state = AppState.DEACTIVATED;
  }

  AppModel.prototype = Object.create(Observer.prototype);
  AppModel.prototype.constructor = AppModel;

  AppModel.prototype.setState = function (actionType, state) {
    this._state = state;
    this.notify(actionType);
  };

  AppModel.prototype.getState = function () {
    return this._state;
  };

  window.AppModel = AppModel;
})();
