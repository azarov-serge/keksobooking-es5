'use strict';
(function () {
  var AbsctractComponent = window.AbsctractComponent;
  var util = window.util;

  var ErrorSelector = {
    ERROR_TEMPLATE: '#error',
    ERROR_CLASS: '.error',
    ERROR_MESSAGE: '.error__message',
    ERROR_BTN: '.error__button',
  };

  function ErrorComponent() {
    AbsctractComponent.call(this);
    this._$errorMessage = null;
    this._$errorBtn = null;
    this._errorClickHandler = this._errorClickHandler.bind(this);
    this._errorButtonClickHandler = this._errorButtonClickHandler.bind(this);
    this._documentKeyDownHandler = this._documentKeyDownHandler.bind(this);
  }

  ErrorComponent.prototype = Object.create(AbsctractComponent.prototype);
  ErrorComponent.prototype.constructor = ErrorComponent;

  ErrorComponent.prototype._getTemplate = function () {
    var $template = document.querySelector(ErrorSelector.ERROR_TEMPLATE).content.querySelector(ErrorSelector.ERROR_CLASS);
    var $error = $template.cloneNode(true);
    return $error;
  };

  ErrorComponent.prototype.getErrorMessage = function () {
    return this._getCustomElement(this._$errorMessage, ErrorSelector.ERROR_MESSAGE, this.getElement());
  };

  ErrorComponent.prototype.getErrorBtn = function () {
    return this._getCustomElement(this._$errorBtn, ErrorSelector.ERROR_BTN, this.getElement());
  };

  ErrorComponent.prototype.addErrorListeners = function () {
    this.getElement().addEventListener('click', this._errorClickHandler);
    this.getErrorBtn().addEventListener('click', this._errorButtonClickHandler);
    document.addEventListener('keydown', this._documentKeyDownHandler);
  };

  ErrorComponent.prototype._errorButtonClickHandler = function () {
    this.remove();
    document.removeEventListener('keydown', this._documentKeyDownHandler);
  };

  ErrorComponent.prototype._documentKeyDownHandler = function (evt) {
    if (util.isEscPressed(evt)) {
      evt.preventDefault();
      this._errorButtonClickHandler();
    }
  };

  ErrorComponent.prototype._errorClickHandler = function (evt) {
    if (evt.target !== this.getErrorMessage()) {
      evt.preventDefault();
      this._errorButtonClickHandler();
    }
  };


  window.ErrorComponent = ErrorComponent;
})();
