'use strict';
(function () {
  var AbsctractView = window.AbsctractView;

  function MapFeaturesView(args) {
    AbsctractView.call(this);
    this._features = args.features;
  }

  MapFeaturesView.prototype = Object.create(AbsctractView.prototype);
  MapFeaturesView.prototype.constructor = MapFeaturesView;


  MapFeaturesView.prototype._getTemplate = function () {
    var features = '';

    this._features.forEach(function (feature) {
      features += getFeatureTemplate(feature) + '\n';
    });

    return (
      '<fieldset id="housing-features" class="map__features">' +
        features +
      '</<fieldset>'
    );
  };


  function getFeatureTemplate(feature) {
    return (
      '<input ' +
        'type="checkbox" ' +
        'name="features" ' +
        'value="' + feature.value + '" ' +
        'id="filter-' + feature.value + '" ' +
        'class="map__checkbox visually-hidden"' +
      '>' +
      '<label ' +
        'class="map__feature map__feature--' + feature.value + '" ' +
        'for="filter-' + feature.value + '"' +
      '>' +
        feature.title +
      '</label>'
    );
  }

  window.MapFeaturesView = MapFeaturesView;
})();
