'use strict';
(function () {
  var AbsctractComponent = window.AbsctractComponent;


  function ErrorComponent() {
    AbsctractComponent.call(this);
    this.errorButtonClickHandler = null;
  }

  ErrorComponent.prototype = Object.create(AbsctractComponent.prototype);
  ErrorComponent.prototype.constructor = ErrorComponent;

  ErrorComponent.prototype._getTemplate = function () {
    var $template = document.querySelector('#error').content.querySelector('.error');
    var $error = $template.cloneNode(true);
    return $error;
  };

  ErrorComponent.prototype.addErrorButtonListener = function () {
    this.getElement().querySelector('.error__button').addEventListener('click', this.errorButtonClickHandler);
  };

  window.ErrorComponent = ErrorComponent;
})();
