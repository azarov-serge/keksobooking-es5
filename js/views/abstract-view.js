'use strict';
(function () {
  // Import utils
  var createElement = window.domUtils.createElement;

  function AbsctractView() {
    this._element = null;
    this._toggleClass = null;
    this._callback = {};
  }

  AbsctractView.prototype.removeElement = function () {
    this._element = null;
  };

  AbsctractView.prototype.getElement = function () {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  };

  AbsctractView.prototype.isHasToggleState = function () {
    return this.getElement().classList.contains(this._toggleClass);
  };

  AbsctractView.prototype.toggleState = function () {
    this.getElement().classList.toggle(this._toggleClass);
  };

  AbsctractView.prototype.disable = function (disable) {
    this.getElement().disabled = disable;
    if (disable) {
      this._removeInnerHandlers();
    } else {
      this._addInnerHandlers();
    }
  };

  AbsctractView.prototype._addInnerHandlers = function () {
  };

  AbsctractView.prototype._removeInnerHandlers = function () {
  };

  AbsctractView.prototype._getTemplate = function () {
    throw new Error('The component can\'t have abstract method');
  };

  window.AbsctractView = AbsctractView;
})();
