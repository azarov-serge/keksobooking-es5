'use strict';
(function () {
  var AbsctractComponent = window.AbsctractComponent;
  var Util = window.Util;

  var SuccessSelector = {
    SUCCESS_TEMPLATE: '#success',
    SUCCESS_CLASS: '.success',
    SUCCESS_MESSAGE: '.success__message',
  };

  function SuccessComponent() {
    AbsctractComponent.call(this);
    this._$successMessage = null;
    this._successClickHandler = this._successClickHandler.bind(this);
    this._documentKeyDownHandler = this._documentKeyDownHandler.bind(this);
  }

  SuccessComponent.prototype = Object.create(AbsctractComponent.prototype);
  SuccessComponent.prototype.constructor = SuccessComponent;

  SuccessComponent.prototype._getTemplate = function () {
    var $template = document.querySelector(SuccessSelector.SUCCESS_TEMPLATE).content.querySelector(SuccessSelector.SUCCESS_CLASS);
    var $success = $template.cloneNode(true);
    return $success;
  };

  SuccessComponent.prototype.getSuccessMessage = function () {
    return this._getCustomElement(this._$successMessage, SuccessSelector.SUCCESS_MESSAGE, this.getElement());
  };

  SuccessComponent.prototype.addSuccessListeners = function () {
    this.getElement().addEventListener('click', this._successClickHandler);
    document.addEventListener('keydown', this._documentKeyDownHandler);
  };

  SuccessComponent.prototype._closeSuccess = function (evt) {
    evt.preventDefault();
    document.removeEventListener('keydown', this._documentKeyDownHandler);
    this.remove();
  };

  SuccessComponent.prototype._documentKeyDownHandler = function (evt) {
    if (Util.isEscPressed(evt)) {
      this._closeSuccess(evt);
    }
  };

  SuccessComponent.prototype._successClickHandler = function (evt) {
    if (evt.target !== this.getSuccessMessage()) {
      this._closeSuccess(evt);
    }
  };

  window.SuccessComponent = SuccessComponent;
})();
