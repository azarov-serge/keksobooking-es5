'use strict';
(function () {
  var AbsctractComponent = window.AbsctractComponent;

  function AbsctractElement() {
    AbsctractComponent.call(this);
    this._SELECTOR = null;
  }

  AbsctractElement.prototype = Object.create(AbsctractComponent.prototype);
  AbsctractElement.prototype.constructor = AbsctractElement;

  AbsctractComponent.prototype._getTemplate = function () {
    throw new Error('The element can\'t have method');
  };

  AbsctractElement.prototype.getElement = function () {
    return this._getCustomElement(this._$element, this._SELECTOR, this._$container);
  };

  window.AbsctractElement = AbsctractElement;
})();
