'use strict';
(function () {
  function AbsctractElement() {
    this._$element = null;
    this.isActivate = false;
    this._SELECTOR = null;
    this._TOGGLE_CLASS = null;
  }

  AbsctractElement.prototype.getCustomElement = function ($element, selector, $container) {
    $container = $container || document;
    if (!$element) {
      $element = $container.querySelector(selector);
    }

    return $element;
  };

  AbsctractElement.prototype.getElement = function () {
    return this.getCustomElement(this._$element, this._SELECTOR);
  };

  AbsctractElement.prototype.toggleState = function () {
    this.getElement().classList.toggle(this._TOGGLE_CLASS);
    this.isActivate = !this.isActivate;
  };

  AbsctractElement.prototype.renderToElement = function ($element, place) {
    window.utils.render(this.getElement(), $element, place);
  };


  AbsctractElement.prototype.remove = function () {
    this.isActivate = false;
    this._$element = null;
  };

  window.AbsctractElement = AbsctractElement;
})();
