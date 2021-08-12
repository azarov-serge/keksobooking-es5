'use strict';
(function () {
  // Import views
  var MapFiltersContainerView = window.MapFiltersContainerView;
  var MapFiltersFormView = window.MapFiltersFormView;
  var MapFilterView = window.MapFilterView;
  var MapFeaturesView = window.MapFeaturesView;

  var mapFilters = window.MapFilters.mapFilters;
  var mapFeatures = window.MapFeatures.mapFeatures;

  // Import utils
  var render = window.DomUtils.render;
  var RenderPosition = window.DomUtils.RenderPosition;

  /**
   * @param {{mapView: *}} args
   */
  function MapFiltersPresenter(args) {
    this._mapView = args.mapView;
    this._mapFiltersContainerView = new MapFiltersContainerView();
    this._mapFiltersFormView = new MapFiltersFormView();
    this._mapFilterViews = [];
    this._mapFeaturesView = new MapFeaturesView({features: mapFeatures});
  }

  MapFiltersPresenter.prototype.init = function () {
    this._renderFilters();
    render(this._mapFiltersFormView, this._mapFeaturesView, RenderPosition.BEFORE_END);
    render(this._mapFiltersContainerView, this._mapFiltersFormView, RenderPosition.BEFORE_END);
    render(this._mapView, this._mapFiltersContainerView, RenderPosition.BEFORE_END);
  };

  MapFiltersPresenter.prototype._renderFilters = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      this._mapFilterViews.push(
          new MapFilterView({
            filter: mapFilters[i],
          })
      );
    }

    render(this._mapFiltersFormView, this._mapFilterViews, RenderPosition.BEFORE_END);
  };

  window.MapFiltersPresenter = MapFiltersPresenter;
})();
