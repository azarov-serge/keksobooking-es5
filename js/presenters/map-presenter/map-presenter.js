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
  var render = window.domUtils.render;
  var remove = window.domUtils.remove;
  var RenderPosition = window.domUtils.RenderPosition;
  var Api = window.Api;
  var filterOrders = window.filterOrders;

  // Import action types
  var ActionType = window.ActionType;
  var AppState = window.AppState;
  // ----- * -----

  var MAP_TOGGLE_CLASS = 'map--faded';
  var PIN_COUNT = 5;

  function MapPresenter(args) {
    this._appView = args.appView;
    this._promoView = args.promoView;
    this._mapView = new MapView({toggleClass: MAP_TOGGLE_CLASS});
    this._mapPinsContainerView = new MapPinsContainerView();
    this._mainPinView = null;
    this._messageView = null;
    this._pinViews = [];
    this._offerCardView = null;

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
    this._handleMainPinMouseMove = this._handleMainPinMouseMove.bind(this);
    this._handlePinClick = this._handlePinClick.bind(this);
    this._handleErrorMessageButtonClick = this._handleErrorMessageButtonClick.bind(this);
    this._handleSuccsessUploadOrderMessageCloseClick = this._handleSuccsessUploadOrderMessageCloseClick.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  MapPresenter.prototype.init = function () {
    // Add subscribe
    this._appModel.subscribe(this._handleModelEvent);
    this._ordersModel.subscribe(this._handleModelEvent);
    this._filtersModel.subscribe(this._handleModelEvent);

    this._mainPinView = new MainPinView({
      onKeyDown: this._handleMainPinMouseDown,
      onMouseDown: this._handleMainPinMouseDown,
      onMouseMove: this._handleMainPinMouseMove,
    });

    render(this._mapPinsContainerView, this._mainPinView, RenderPosition.BEFORE_END);
    render(this._mapView, this._mapPinsContainerView, RenderPosition.BEFORE_END);

    this._mapFiltersPresenter.init();

    render(this._appView, this._mapView, RenderPosition.AFTER_BEGIN);
  };

  MapPresenter.prototype.destroy = function () {
    this._appModel.unsubscribe(this._handleModelEvent);
    this._ordersModel.unsubscribe(this._handleModelEvent);
    this._filtersModel.unsubscribe(this._handleModelEvent);
  };

  MapPresenter.prototype._activateMap = function () {
    var isNeedToggle = this._mapView.isHasToggleState() && this._appModel.getState() === AppState.ACTIVATED;

    if (isNeedToggle) {
      this._mapView.toggleState();
    }
  };

  MapPresenter.prototype._deactivateMap = function () {
    var isNeedToggle = !this._mapView.isHasToggleState() && this._appModel.getState() === AppState.DEACTIVATED;

    if (isNeedToggle) {
      this._mapView.toggleState();
    }

    this._mainPinView.reset();
    this._mapFiltersPresenter.reset();
    this._removeOfferCard();
    this._removePins();
    this._ordersModel.setCoords(ActionType.UPDATE_INIT_COORDS, this._mainPinView.getDefaultCoords());
  };

  MapPresenter.prototype._handleMainPinMouseDown = function () {
    if (this._appModel.getState() === AppState.DEACTIVATED) {
      this._appModel.setState(ActionType.ACTIVATE_APP, AppState.ACTIVATED);
      this._fetchOrders();
    }
  };

  MapPresenter.prototype._handleMainPinMouseMove = function (coords) {
    this._ordersModel.setCoords(ActionType.UPDATE_COORDS, coords);
  };

  MapPresenter.prototype._fetchOrders = function () {
    Api.getOrders()
        .then(this._setOrders)
        .catch(this._setError);
  };

  MapPresenter.prototype._setOrders = function (result) {
    this._ordersModel.setOrders(ActionType.UPDATE_ORDERS, result.response);
  };

  MapPresenter.prototype._setError = function (error) {
    this._ordersModel.setError(ActionType.ERROR, error.message);
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
      var pinView = new PinView({
        order: orders[index],
        onClick: this._handlePinClick,
      });

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
    this._removeOfferCard();
    this._offerCardView = new OfferCardView(order);
    render(this._mapView, this._offerCardView, RenderPosition.BEFORE_END);
  };

  MapPresenter.prototype._removeOfferCard = function () {
    if (this._offerCardView) {
      remove(this._offerCardView);

      this._offerCardView = null;
    }
  };

  MapPresenter.prototype._renderSuccsessUploadOrderMessage = function () {
    this._removeMessage();

    this._messageView = new MessageView({
      type: 'success',
      message: 'Ваше объявление<br /> успешно размещено!',
      onClose: this._handleSuccsessUploadOrderMessageCloseClick,
    });

    render(this._appView, this._messageView, RenderPosition.BEFORE_END);
  };

  MapPresenter.prototype._renderErrorMessage = function (error) {
    this._removeMessage();

    this._messageView = new MessageView({
      type: 'error',
      message: 'Ошибка загрузки объявления. \n' + error,
      buttonCaption: 'Попробовать снова',
      onButtonClick: this._handleErrorMessageButtonClick,
    });

    render(this._appView, this._messageView, RenderPosition.BEFORE_END);
  };

  MapPresenter.prototype._removeMessage = function () {
    if (this._messageView) {
      remove(this._messageView);
      this._messageView = null;
    }
  };

  MapPresenter.prototype._handleErrorMessageButtonClick = function () {
    this._messageView = null;
    this._fetchOrders();
  };

  MapPresenter.prototype._handleSuccsessUploadOrderMessageCloseClick = function () {
    this._messageView = null;
  };

  MapPresenter.prototype._handleModelEvent = function (actionType, payload) {
    switch (actionType) {
      case ActionType.ACTIVATE_APP:
        this._activateMap();
        break;
      case ActionType.DEACTIVATE_APP:
        this._deactivateMap();
        break;
      case ActionType.UPDATE_ORDERS:
      case ActionType.UPDATE_FILTERS:
      case ActionType.UPDATE_FEATURES:
        this._updatePins();
        break;
      case ActionType.ORDER_UPLOADED:
        this._renderSuccsessUploadOrderMessage();
        break;
      case ActionType.ERROR:
        this._renderErrorMessage(payload);
        break;
    }
  };

  window.MapPresenter = MapPresenter;
})();
