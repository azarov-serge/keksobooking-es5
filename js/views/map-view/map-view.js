'use strict';
(function () {
  // Import views
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function MapView(args) {
    AbsctractView.call(this);

    this._toggleClass = args.toggleClass;
  }

  MapView.prototype = Object.create(AbsctractView.prototype);
  MapView.prototype.constructor = MapView;

  MapView.prototype._getTemplate = function () {
    return (
      '<section class="map">' +
        '<h2 class="visually-hidden">Карта с объявлениями</h2>' +
      '</section>'
    );
  };

  window.MapView = MapView;
})();
