'use strict';
(function () {
  // Import views
  var MapFiltersContainerView = window.MapFiltersContainerView;
  var MapFiltersFormView = window.MapFiltersFormView;
  var MapFilterView = window.MapFilterView;
  var FeaturesView = window.FeaturesView;

  // Import action types
  var ActionType = window.ActionType;

  // Import constants
  var mapFilters = window.MapFilters.mapFilters;
  var featuresOptions = window.order.featuresOptions;

  // Import utils
  var render = window.domUtils.render;
  var RenderPosition = window.domUtils.RenderPosition;
  // ----- * -----

  function MapFiltersPresenter(args) {
    this._mapView = args.mapView;
    this._mapFiltersContainerView = new MapFiltersContainerView();
    this._mapFiltersFormView = new MapFiltersFormView();
    this._mapFilterViews = [];
    this._mapFeaturesView = null;

    this._filtersModel = args.filtersModel;

    this._handleFilterChange = this._handleFilterChange.bind(this);
    this._handleFeaturesChange = this._handleFeaturesChange.bind(this);
  }

  MapFiltersPresenter.prototype.init = function () {
    this._renderFilters();
    this._renderFeatures();

    render(this._mapFiltersContainerView, this._mapFiltersFormView, RenderPosition.BEFORE_END);
    render(this._mapView, this._mapFiltersContainerView, RenderPosition.BEFORE_END);
  };

  MapFiltersPresenter.prototype.reset = function () {
    this._mapFeaturesView.reset('MapFiltersPresenter');
    this._mapFilterViews.forEach(function (mapFilterView) {
      mapFilterView.reset();
    });
  };

  MapFiltersPresenter.prototype._renderFilters = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      var mapFilterView = new MapFilterView({
        filter: mapFilters[i],
        onChange: this._handleFilterChange,
      });

      this._mapFilterViews.push(mapFilterView);
    }

    render(this._mapFiltersFormView, this._mapFilterViews, RenderPosition.BEFORE_END);
  };

  MapFiltersPresenter.prototype._renderFeatures = function () {
    this._mapFeaturesView = new FeaturesView({
      options: featuresOptions,
      type: 'map',
      onChange: this._handleFeaturesChange,
    });

    render(this._mapFiltersFormView, this._mapFeaturesView, RenderPosition.BEFORE_END);
  };

  MapFiltersPresenter.prototype._handleFilterChange = function (result) {
    var filters = Object.assign({}, this._filtersModel.getFilters());
    filters[result.type] = result.value;
    this._filtersModel.setFilters(ActionType.UPDATE_FILTERS, filters);
  };

  MapFiltersPresenter.prototype._handleFeaturesChange = function (features) {
    this._filtersModel.setFeatures(ActionType.UPDATE_FEATURES, features);
  };


  window.MapFiltersPresenter = MapFiltersPresenter;
})();
