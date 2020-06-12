'use strict';
(function () {
  function AbsctractComponent() {
    this._$element = null;
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

  AbsctractComponent.prototype.render = function ($container, $element, place) {
    window.utils.render($container, $element, place);
  };

  AbsctractComponent.prototype.remove = function () {
    this._$element.parentElement.removeChild(this._$element);
    this._$element = null;
  };

  window.AbsctractComponent = AbsctractComponent;
})();
