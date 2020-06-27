'use strict';
(function () {
  var util = window.util;

  function AbsctractComponent() {
    this._$element = null;
    this._TOGGLE_CLASS = null;
  }

  AbsctractComponent.prototype._getTemplate = function () {
    throw new Error('The component can\'t have abstract method');
  };

  AbsctractComponent.prototype.getElement = function () {
    if (!this._$element) {
      this._$element = this._getTemplate();
    }

    return this._$element;
  };

  AbsctractComponent.prototype._getCustomElement = function ($element, selector, $container) {
    $container = $container || document;
    if (!$element) {
      $element = $container.querySelector(selector);
    }

    return $element;
  };

  AbsctractComponent.prototype._getCustomElements = function ($elements, selector, $container) {
    $container = $container || document;
    if (!$elements) {
      $elements = $container.querySelectorAll(selector);
    }

    return $elements;
  };

  AbsctractComponent.prototype._isClassExist = function (className, classNameText) {
    if (!className) {
      throw new Error('A ' + classNameText + ' class not exist');
    }
  };

  AbsctractComponent.prototype.isActivate = function () {
    this._isClassExist(this._TOGGLE_CLASS, 'toggle');
    return !this.getElement().classList.contains(this._TOGGLE_CLASS);
  };

  AbsctractComponent.prototype.toggleState = function () {
    this._isClassExist(this._TOGGLE_CLASS, 'toggle');
    this.getElement().classList.toggle(this._TOGGLE_CLASS);
  };

  AbsctractComponent.prototype.render = function ($container, place) {
    util.render($container, this.getElement(), place);
  };

  AbsctractComponent.prototype.remove = function () {
    this.getElement().parentElement.removeChild(this._$element);
    this._$element = null;
  };

  window.AbsctractComponent = AbsctractComponent;
})();
