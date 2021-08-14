'use strict';
(function () {
  // Import views
  var MapFiltersContainerView = window.MapFiltersContainerView;
  var MapFiltersFormView = window.MapFiltersFormView;
  var MapFilterView = window.MapFilterView;
  var MapFeaturesView = window.MapFeaturesView;

  // Import action types
  var UpdateType = window.UpdateType;

  // Import constants
  var mapFilters = window.MapFilters.mapFilters;
  var mapFeatures = window.MapFeatures.mapFeatures;

  // Import utils
  var render = window.DomUtils.render;
  var RenderPosition = window.DomUtils.RenderPosition;
  // ----- * -----
  function MapFiltersPresenter(args) {
    this._mapView = args.mapView;
    this._mapFiltersContainerView = new MapFiltersContainerView();
    this._mapFiltersFormView = new MapFiltersFormView();
    this._mapFilterViews = [];
    this._mapFeaturesView = new MapFeaturesView({features: mapFeatures});

    this._filtersModel = args.filtersModel;

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleFeaturesChange = this._handleFeaturesChange.bind(this);
  }

  MapFiltersPresenter.prototype.init = function () {
    this._renderFilters();

    this._mapFeaturesView.setChangeHandler(this._handleFeaturesChange);
    render(this._mapFiltersFormView, this._mapFeaturesView, RenderPosition.BEFORE_END);
    render(this._mapFiltersContainerView, this._mapFiltersFormView, RenderPosition.BEFORE_END);
    render(this._mapView, this._mapFiltersContainerView, RenderPosition.BEFORE_END);
  };

  MapFiltersPresenter.prototype._renderFilters = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      var mapFilterView = new MapFilterView(mapFilters[i]);

      mapFilterView.setChangeHandler(this._handleFilterChange);

      this._mapFilterViews.push(mapFilterView);
    }

    render(this._mapFiltersFormView, this._mapFilterViews, RenderPosition.BEFORE_END);
  };

  MapFiltersPresenter.prototype._handleFilterChange = function (result) {
    var filters = Object.assign({}, this._filtersModel.getFilters());
    filters[result.type] = result.value;
    this._filtersModel.setFilters(UpdateType.MINOR, filters);
  };

  MapFiltersPresenter.prototype._handleFeaturesChange = function (features) {
    this._filtersModel.setFeatures(UpdateType.MINOR, features);
  };


  window.MapFiltersPresenter = MapFiltersPresenter;
})();
