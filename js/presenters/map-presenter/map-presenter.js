'use strict';
(function () {
  // Import views
  var MapView = window.MapView;
  var MapFiltersPresenter = window.MapFiltersPresenter;
  var MapPinsContainerView = window.MapPinsContainerView;
  var MainPinView = window.MainPinView;
  var PinView = window.PinView;

  // Import utils
  var render = window.DomUtils.render;
  var remove = window.DomUtils.remove;
  var RenderPosition = window.DomUtils.RenderPosition;
  var Api = window.Api;

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
    this._pinViews = [];

    this._mapFiltersPresenter = new MapFiltersPresenter({mapView: this._mapView});

    this._appModel = args.appModel;
    this._ordersModel = args.ordersModel;

    this._setOrders = this._setOrders.bind(this);
    this._setError = this._setError.bind(this);

    this._handleMainPinMouseDown = this._handleMainPinMouseDown.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);
  }

  MapPresenter.prototype.init = function () {
    this._appModel.subscribe(this._modelEventHandler);
    this._ordersModel.subscribe(this._modelEventHandler);


    this._mapView.setToggleClass(MAP_TOGGLE_CLASS);
    this._mainPinView.setKeyDownHandler(this._handleMainPinMouseDown);
    this._mainPinView.setMouseDownHandler(this._handleMainPinMouseDown);
    // eslint-disable-next-line
    this._mainPinView.setMouseMoveHandler(console.log);


    if (!this._mapView.isHasToggleState()) {
      this._mapView.toggleState();
    }

    render(this._mapPinsContainerView, this._mainPinView, RenderPosition.BEFORE_END);
    render(this._mapView, this._mapPinsContainerView, RenderPosition.BEFORE_END);

    this._mapFiltersPresenter.init();


    render(this._appView, this._mapView, RenderPosition.AFTER_BEGIN);
  };

  MapPresenter.prototype.destroy = function () {
    this._appModel.unsubscribe(this._modelEventHandler);
    this._ordersModel.unsubscribe(this._modelEventHandler);
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

  MapPresenter.prototype._handleMainPinMouseDown = function (coords) {
    // eslint-disable-next-line no-console
    console.log('Start coords: ', coords);

    if (this._appModel.getState() === AppState.DEACTIVATED) {
      this._appModel.setState(UpdateType.INIT, AppState.ACTIVATED);
      Api.getOrders()
        .then(this._setOrders)
        .catch(this._setError);
    }
  };

  MapPresenter.prototype._setOrders = function (result) {
    this._ordersModel.setOrders(UpdateType.MINOR, result.response);
  };

  MapPresenter.prototype._setError = function (error) {
    this._ordersModel.setError(UpdateType.ERROR, error);
  };

  MapPresenter.prototype._updatePins = function () {
    this._removePins();
    this._renderPins();
  };

  MapPresenter.prototype._renderPins = function () {
    var orders = this._ordersModel.getOrders();

    for (var index = 0; index < orders.length; index++) {
      this._pinViews.push(new PinView(orders[index]));
    }

    render(this._mapPinsContainerView, this._pinViews, RenderPosition.AFTER_BEGIN);
  };

  MapPresenter.prototype._removePins = function () {
    this._pinViews.forEach(function (pinView) {
      remove(pinView);
    });
  };


  MapPresenter.prototype._modelEventHandler = function (actionType, _payload) {
    switch (actionType) {
      case UpdateType.INIT:
        this._toggleMapState();
        break;
      case UpdateType.MINOR:
        // Rerender points
        this._updatePins();
        break;
      case UpdateType.MAJOR:
        // Rerender points and reset filters
        this._updatePins();
        break;
      case UpdateType.ERROR:
        this._renderError();
        break;
    }
  };

  window.MapPresenter = MapPresenter;
})();
