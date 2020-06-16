'use strict';
(function () {
  var Utils = window.Utils;

  function AbsctractComponent() {
    this._$element = null;
    this._TOGGLE_CLASS = null;
  }

  AbsctractComponent.prototype._getTemplate = function () {
    throw new Error('Component can\'t have abstract method');
  };

  AbsctractComponent.prototype.getElement = function () {
    if (!this._$element) {
      this._$element = this._getTemplate();
    }

    return this._$element;
  };

  AbsctractComponent.prototype.isActivate = function () {
    return !this.getElement().classList.contains(this._TOGGLE_CLASS);
  };

  AbsctractComponent.prototype.toggleStateCallback = function () {};

  AbsctractComponent.prototype.toggleState = function () {
    this.getElement().classList.toggle(this._TOGGLE_CLASS);
    this.toggleStateCallback();
  };

  AbsctractComponent.prototype.render = function ($container, place) {
    Utils.render($container, this._$element, place);
  };

  AbsctractComponent.prototype.remove = function () {
    this._$element.parentElement.removeChild(this._$element);
    this._$element = null;
  };

  window.AbsctractComponent = AbsctractComponent;
})();
