'use strict';
(function () {
  // Import views
  var MapView = window.MapView;
  var MapFiltersPresenter = window.MapFiltersPresenter;
  var MapPinsContainerView = window.MapPinsContainerView;
  var MainPinView = window.MainPinView;
  var PinView = window.PinView;
  var MessageView = window.MessageView;
  var OfferCardView = window.OfferCardView;

  // Import utils
  var render = window.DomUtils.render;
  var remove = window.DomUtils.remove;
  var RenderPosition = window.DomUtils.RenderPosition;
  var Api = window.Api;
  var filterOrders = window.filterOrders;
  var generateOrders = window.generateOrders;

  // Import action types
  var UpdateType = window.UpdateType;
  var AppState = window.AppState;
  // ----- * -----

  var MAP_TOGGLE_CLASS = 'map--faded';
  var PIN_COUNT = 5;

  function MapPresenter(args) {
    this._appView = args.appView;
    this._promoView = args.promoView;
    this._mapView = new MapView();
    this._mapPinsContainerView = new MapPinsContainerView();
    this._mainPinView = new MainPinView();
    this._messageView = null;
    this._pinViews = [];

    this._appModel = args.appModel;
    this._ordersModel = args.ordersModel;
    this._filtersModel = args.filtersModel;

    this._mapFiltersPresenter = new MapFiltersPresenter({
      mapView: this._mapView,
      filtersModel: args.filtersModel,
    });

    this._setOrders = this._setOrders.bind(this);
    this._setError = this._setError.bind(this);
    this._fetchOrders = this._fetchOrders.bind(this);

    this._handleMainPinMouseDown = this._handleMainPinMouseDown.bind(this);
    this._handlePinClick = this._handlePinClick.bind(this);
    this._handleErrorMessageButtonClick = this._handleErrorMessageButtonClick.bind(this);

    this._modelEventHandler = this._modelEventHandler.bind(this);
  }

  MapPresenter.prototype.init = function () {
    // Add subscribe
    this._appModel.subscribe(this._modelEventHandler);
    this._ordersModel.subscribe(this._modelEventHandler);
    this._filtersModel.subscribe(this._modelEventHandler);

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
    this._filtersModel.unsubscribe(this._modelEventHandler);
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
      this._fetchOrders();
    }
  };

  MapPresenter.prototype._fetchOrders = function () {
    var orders = generateOrders(10);
    this._ordersModel.setOrders(UpdateType.MINOR, orders);
    // Api.getOrders()
    //     .then(this._setOrders)
    //     .catch(this._setError);
  };

  MapPresenter.prototype._setOrders = function (result) {
    this._ordersModel.setOrders(UpdateType.MINOR, result.response);
  };

  MapPresenter.prototype._setError = function (error) {
    this._ordersModel.setError(UpdateType.ERROR, error.message);
  };

  MapPresenter.prototype._updatePins = function () {
    this._removePins();
    this._renderPins();
  };

  MapPresenter.prototype._renderPins = function () {
    if (!this._ordersModel.getOrders().length) {
      return;
    }

    var orders = filterOrders(
        this._ordersModel.getOrders(),
        this._filtersModel.getFilters(),
        this._filtersModel.getFeatures()
    ).slice(0, PIN_COUNT);

    for (var index = 0; index < orders.length; index++) {
      var pinView = new PinView(orders[index]);
      pinView.setClickHandler(this._handlePinClick);

      this._pinViews.push(pinView);
    }

    render(this._mapPinsContainerView, this._pinViews, RenderPosition.AFTER_BEGIN);
  };

  MapPresenter.prototype._removePins = function () {
    if (!this._ordersModel.getOrders().length) {
      return;
    }

    this._pinViews.forEach(function (pinView) {
      remove(pinView);
    });

    this._pinViews = [];
  };

  MapPresenter.prototype._handlePinClick = function (order) {
    var offerCardView = new OfferCardView(order);
    render(this._mapView, offerCardView, RenderPosition.BEFORE_END);
  };

  MapPresenter.prototype._renderErrorMessage = function (error) {
    this._removeErrorMessage();

    this._messageView = new MessageView({
      type: 'error',
      message: 'Ошибка загрузки объявления. \n' + error,
      buttonCaption: 'Попробовать снова',
      onButtonClick: this._handleErrorMessageButtonClick,
    });

    render(this._appView, this._messageView, RenderPosition.BEFORE_END);
  };

  MapPresenter.prototype._removeErrorMessage = function () {
    if (this._messageView) {
      remove(this._messageView);
      this._messageView = null;
    }
  };

  MapPresenter.prototype._handleErrorMessageButtonClick = function () {
    this._messageView = null;
    this._fetchOrders();
  };

  MapPresenter.prototype._modelEventHandler = function (actionType, payload) {
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
        this._renderErrorMessage(payload);
        break;
    }
  };

  window.MapPresenter = MapPresenter;
})();
