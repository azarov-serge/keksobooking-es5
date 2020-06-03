'use strict';
(function () {
  var AbsctractComponent = function () {
    this._element = null;
  };

  AbsctractComponent.prototype.getElement = function () {
    throw new Error('Component can\'t have abstract method');
  };

  AbsctractComponent.prototype.removeElement = function () {
    this._element = null;
  };

  window.AbsctractComponent = AbsctractComponent;
})();
