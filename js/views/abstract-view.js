'use strict';
(function () {
  // Import utils
  var createElement = window.DomUtils.createElement;

  function AbsctractView() {
    this._element = null;
    this._TOGGLE_CLASS = null;
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

  AbsctractView.prototype.isActivate = function () {
    this._isClassExist(this._TOGGLE_CLASS, 'toggle');
    return !this.getElement().classList.contains(this._TOGGLE_CLASS);
  };

  AbsctractView.prototype.toggleState = function () {
    this._isClassExist(this._TOGGLE_CLASS, 'toggle');
    this.getElement().classList.toggle(this._TOGGLE_CLASS);
  };

  AbsctractView.prototype._getTemplate = function () {
    throw new Error('The component can\'t have abstract method');
  };

  window.AbsctractView = AbsctractView;
})();
