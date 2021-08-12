'use strict';
(function () {
  var AbsctractView = window.AbsctractView;

  function MapFiltersFormView() {
    AbsctractView.call(this);
  }

  MapFiltersFormView.prototype = Object.create(AbsctractView.prototype);
  MapFiltersFormView.prototype.constructor = MapFiltersFormView;


  MapFiltersFormView.prototype._getTemplate = function () {

    return '<form action="#" class="map__filters" autocomplete="off"></form>';
  };

  window.MapFiltersFormView = MapFiltersFormView;
})();
