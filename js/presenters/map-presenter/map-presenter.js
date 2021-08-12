'use strict';
(function () {
  // Import views
  var MapView = window.MapView;
  var MapFiltersPresenter = window.MapFiltersPresenter;
  var MapPinsContainerView = window.MapPinsContainerView;
  var MainPinView = window.MainPinView;

  // Import utils
  var render = window.DomUtils.render;
  var RenderPosition = window.DomUtils.RenderPosition;

  var UpdateType = window.UpdateType;
  var AppState = window.AppState;

  var MAP_TOGGLE_CLASS = 'map--faded';

  /**
   * @param {{appView: *, promoView: *}} args
   */
  function MapPresenter(args) {
    this._appView = args.appView;
    this._promoView = args.promoView;
    this._mapView = new MapView();
    this._mapPinsContainerView = new MapPinsContainerView();
    this._mainPinView = new MainPinView();

    this._mapFiltersPresenter = new MapFiltersPresenter({mapView: this._mapView});

    this._appModel = args.appModel;

    this._handleMainPinClick = this._handleMainPinClick.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);
  }

  MapPresenter.prototype.init = function () {
    this._appModel.subscribe(this._modelEventHandler);
    this._mapView.setToggleClass(MAP_TOGGLE_CLASS);
    this._mainPinView.setClickHandler(this._handleMainPinClick);

    if (!this._mapView.isHasToggleState()) {
      this._mapView.toggleState();
    }

    render(this._mapPinsContainerView, this._mainPinView, RenderPosition.BEFORE_END);
    render(this._mapView, this._mapPinsContainerView, RenderPosition.BEFORE_END);

    this._mapFiltersPresenter.init();


    render(this._appView, this._mapView, RenderPosition.AFTER_BEGIN);
  };

  MapPresenter.prototype._toggleMapState = function () {
    var isNeedToggle = (
      (this._mapView.isHasToggleState && this._appModel.getState() === AppState.ACTIVATED) ||
      (!this._mapView.isHasToggleState && this._appModel.getState() === AppState.DEACTIVATED)
    );

    if (isNeedToggle) {
      this._mapView.toggleState();
    }
  };

  MapPresenter.prototype._handleMainPinClick = function () {
    if (this._appModel.getState() === AppState.DEACTIVATED) {
      this._appModel.setState(UpdateType.PATCH, AppState.ACTIVATED);
    }
  };

  MapPresenter.prototype._updatePins = function () {

  };


  MapPresenter.prototype._modelEventHandler = function (actionType, payload) {
    switch (actionType) {
      case UpdateType.PATCH:
        this._toggleMapState();
        break;
      case UpdateType.MINOR:
        this._updatePins(payload);
        break;
      case UpdateType.MAJOR:
        this._updatePins(payload);
        break;
      case UpdateType.INIT:
        this._updatePins(payload);
        break;
      case UpdateType.ERROR:
        this._updatePins(payload);
        break;
    }
  };

  window.MapPresenter = MapPresenter;
})();
