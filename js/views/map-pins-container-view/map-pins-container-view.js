'use strict';
(function () {
  // Import views
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function MapPinsContainerView() {
    AbsctractView.call(this);
  }

  MapPinsContainerView.prototype = Object.create(AbsctractView.prototype);
  MapPinsContainerView.prototype.constructor = MapPinsContainerView;

  MapPinsContainerView.prototype._getTemplate = function () {
    return (
      '<div class="map__pins">' +
        '<div class="map__overlay">' +
          '<h2 class="map__title">И снова Токио!</h2>' +
        '</div>' +
      '</div>'
    );
  };

  window.MapPinsContainerView = MapPinsContainerView;
})();
