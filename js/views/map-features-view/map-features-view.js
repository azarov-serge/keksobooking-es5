'use strict';
(function () {
  // Import views
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function MapFeaturesView(args) {
    AbsctractView.call(this);
    this._features = args.features;

    this._handleChage = this._handleChage.bind(this);
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

  MapFeaturesView.prototype.setChangeHandler = function (handler) {
    this._callback.mapFeaturesChange = handler;
    this.getElement().addEventListener('change', this._handleChage);
  };

  MapFeaturesView.prototype._handleChage = function (evt) {
    evt.preventDefault();
    var features = [];
    evt.target.parentNode.querySelectorAll('input').forEach(function (input) {
      if (input.checked) {
        features.push(input.value);
      }
    });

    this._callback.mapFeaturesChange(features);
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
