'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function NewOrderContainerView() {
    AbsctractView.call(this);
  }

  NewOrderContainerView.prototype = Object.create(AbsctractView.prototype);
  NewOrderContainerView.prototype.constructor = NewOrderContainerView;

  NewOrderContainerView.prototype._getTemplate = function () {
    return (
      '<section class="notice">' +
        '<h2 class="notice__title">Ваше объявление</h2>' +
      '</section>'
    );
  };

  window.NewOrderContainerView = NewOrderContainerView;
})();
