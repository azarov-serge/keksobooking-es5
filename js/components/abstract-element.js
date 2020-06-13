'use strict';
(function () {
  function AbsctractElement() {
    this._$element = null;
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

  AbsctractElement.prototype.getCustomElements = function ($elements, selector, $container) {
    $container = $container || document;
    if (!$elements) {
      $elements = $container.querySelectorAll(selector);
    }

    return $elements;
  };

  AbsctractElement.prototype.getElement = function () {
    return this.getCustomElement(this._$element, this._SELECTOR);
  };

  AbsctractElement.prototype.isActivate = function () {
    return !this.getElement().classList.contains(this._TOGGLE_CLASS);
  };

  AbsctractElement.prototype.toggleStateCallback = function () {};

  AbsctractElement.prototype.toggleState = function () {
    this.getElement().classList.toggle(this._TOGGLE_CLASS);
    this.isActivate = !this.isActivate;
    this.toggleStateCallback();
  };

  AbsctractElement.prototype.render = function ($container, $element, place) {
    window.utils.render($container, $element, place);
  };


  AbsctractElement.prototype.remove = function () {
    this.isActivate = false;
    this._$element = null;
  };

  window.AbsctractElement = AbsctractElement;
})();
