'use strict';
(function () {
  var AbsctractComponent = window.AbsctractComponent;


  function SuccessComponent() {
    AbsctractComponent.call(this);
    this.errorButtonClickHandler = null;
  }

  SuccessComponent.prototype = Object.create(AbsctractComponent.prototype);
  SuccessComponent.prototype.constructor = SuccessComponent;

  SuccessComponent.prototype._getTemplate = function () {
    var $template = document.querySelector('#success').content.querySelector('.success');
    var $success = $template.cloneNode(true);
    return $success;
  };

  window.ErrorComponent = SuccessComponent;
})();
