'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function AppView() {
    AbsctractView.call(this);
  }

  AppView.prototype = Object.create(AbsctractView.prototype);
  AppView.prototype.constructor = AppView;

  AppView.prototype._getTemplate = function () {
    return '<main></main>';
  };

  window.AppView = AppView;
})();
