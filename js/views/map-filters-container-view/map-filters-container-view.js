'use strict';
(function () {
  // Import views
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function MapFiltersContainerView() {
    AbsctractView.call(this);
  }

  MapFiltersContainerView.prototype = Object.create(AbsctractView.prototype);
  MapFiltersContainerView.prototype.constructor = MapFiltersContainerView;


  MapFiltersContainerView.prototype._getTemplate = function () {

    return '<div class="map__filters-container"></div>';
  };

  window.MapFiltersContainerView = MapFiltersContainerView;
})();
