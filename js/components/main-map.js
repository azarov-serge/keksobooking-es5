'use strict';
(function () {
  var DEACTIVATE_CLASS = 'map--faded';

  function MainMap() {
    window.AbsctractComponent.call(this);
    this._isActivate = false;
  }

  MainMap.prototype = Object.create(window.AbsctractComponent.prototype);
  MainMap.prototype.constructor = MainMap;

  MainMap.prototype.getElement = function () {
    if (!this._element) {
      this._element = document.querySelector('.map');
    }

    return this._element;
  };

  MainMap.prototype.activate = function () {
    this._element.classList.remove(DEACTIVATE_CLASS);
    this._isActivate = true;
  };

  window.MainMap = MainMap;
})();
