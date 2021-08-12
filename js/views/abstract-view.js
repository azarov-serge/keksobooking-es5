'use strict';
(function () {
  // Import utils
  var createElement = window.DomUtils.createElement;

  function AbsctractView() {
    this._element = null;
    this._TOGGLE_CLASS = null;
    this._callback = {};
  }

  AbsctractView.prototype.remove = function () {
    this._element = null;
  };

  AbsctractView.prototype.getElement = function () {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  };

  AbsctractView.prototype.setToggleClass = function (className) {
    this._TOGGLE_CLASS = className;
  };

  AbsctractView.prototype.isHasToggleState = function () {
    return this.getElement().classList.contains(this._TOGGLE_CLASS);
  };

  AbsctractView.prototype.toggleState = function () {
    this.getElement().classList.toggle(this._TOGGLE_CLASS);
  };

  AbsctractView.prototype._getTemplate = function () {
    throw new Error('The component can\'t have abstract method');
  };

  window.AbsctractView = AbsctractView;
})();
