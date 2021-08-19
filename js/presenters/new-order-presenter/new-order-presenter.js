'use strict';
(function () {
  // Import views
  var NewOrderContainerView = window.NewOrderContainerView;
  var NewOrderFormView = window.NewOrderFormView;
  var NewOrderAvatarLoaderView = window.NewOrderAvatarLoaderView;
  var NewOrderTitleView = window.NewOrderTitleView;
  var NewOrderAddressView = window.NewOrderAddressView;
  var NewOrderTypeView = window.NewOrderTypeView;
  var NewOrderPriceView = window.NewOrderPriceView;
  var NewOrderTimeView = window.NewOrderTimeView;
  var NewOrderRoomsView = window.NewOrderRoomsView;
  var NewOrderGuestsView = window.NewOrderGuestsView;
  var NewOrderDescriptionView = window.NewOrderDescriptionView;
  var NewOrderPhotosLoaderView = window.NewOrderPhotosLoaderView;
  var NewOrderButtonsView = window.NewOrderButtonsView;
  var FeaturesView = window.FeaturesView;

  // Import action types
  var ActionType = window.ActionType;

  // Import utils
  var render = window.domUtils.render;
  var RenderPosition = window.domUtils.RenderPosition;
  var convertToLocationCoords = window.coordsUtils.convertToLocationCoords;
  var Api = window.Api;

  // Import constants
  var typeOptions = window.order.typeOptions;
  var roomsOptions = window.order.roomsOptions;
  var guestsOptions = window.order.guestsOptions;
  var timeInOptions = window.order.timeInOptions;
  var timeOutOptions = window.order.timeOutOptions;
  var featuresOptions = window.order.featuresOptions;
  var typeToMinPrice = window.order.typeToMinPrice;
  var AppState = window.AppState;
  // ----- * -----

  function NewOrderPresenter(args) {
    this._initAddressCoords = null;
    this._appView = args.appView;
    this._newOrderContainerView = new NewOrderContainerView();
    this._newOrderFormView = null;
    this._newOrderFieldsets = {};

    this._appModel = args.appModel;
    this._ordersModel = args.ordersModel;

    this.setAddress = this.setAddress.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleReset = this._handleReset.bind(this);
    this._uploadNewOrderSucces = this._uploadNewOrderSucces.bind(this);
    this._uploadNewOrderError = this._uploadNewOrderError.bind(this);
    this._handleTypeChage = this._handleTypeChage.bind(this);
    this._handleRoomsChage = this._handleRoomsChage.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  NewOrderPresenter.prototype.init = function () {
    this._appModel.subscribe(this._handleModelEvent);
    this._ordersModel.subscribe(this._handleModelEvent);

    this._newOrderFormView = new NewOrderFormView({
      toggleClass: 'ad-form--disabled',
      onSubmit: this._handleSubmit,
      onReset: this._handleReset,
    });

    this._renderAvatarLoader();
    this._renderTitle();
    this._renderAddress();
    this._renderType();
    this._renderPrice();
    this._renderTime();
    this._renderRooms();
    this._renderGuests();
    this._renderFeatures();
    this._renderDescription();
    this._renderPhotosLoader();
    this._renderButtons();

    render(this._newOrderContainerView, this._newOrderFormView, RenderPosition.BEFORE_END);
    render(this._appView, this._newOrderContainerView, RenderPosition.BEFORE_END);

    this._reset();
  };

  NewOrderPresenter.prototype.setInitAddress = function (coords) {
    var address = coords.x + ', ' + coords.y;
    this._newOrderFieldsets.addressView.setAddress(address);
  };

  NewOrderPresenter.prototype.setAddress = function (coords) {
    var locationCoords = convertToLocationCoords(coords);
    var address = locationCoords.x + ', ' + locationCoords.y;
    this._newOrderFieldsets.addressView.setAddress(address);
  };

  NewOrderPresenter.prototype._renderAvatarLoader = function () {
    this._newOrderFieldsets.avatarLoaderView = new NewOrderAvatarLoaderView();
    render(this._newOrderFormView, this._newOrderFieldsets.avatarLoaderView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderTitle = function () {
    this._newOrderFieldsets.titleView = new NewOrderTitleView();
    render(this._newOrderFormView, this._newOrderFieldsets.titleView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderAddress = function () {
    this._newOrderFieldsets.addressView = new NewOrderAddressView();
    render(this._newOrderFormView, this._newOrderFieldsets.addressView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderPrice = function () {
    this._newOrderFieldsets.priceView = new NewOrderPriceView();
    render(this._newOrderFormView, this._newOrderFieldsets.priceView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderType = function () {
    this._newOrderFieldsets.typeView = new NewOrderTypeView({
      options: typeOptions,
      onChange: this._handleTypeChage,
    });
    render(this._newOrderFormView, this._newOrderFieldsets.typeView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderTime = function () {
    this._newOrderFieldsets.timeView = new NewOrderTimeView({
      timeInOptions: timeInOptions,
      timeOutOptions: timeOutOptions,
    });
    render(this._newOrderFormView, this._newOrderFieldsets.timeView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderRooms = function () {
    this._newOrderFieldsets.roomsView = new NewOrderRoomsView({
      options: roomsOptions,
      onChange: this._handleRoomsChage,
    });
    render(this._newOrderFormView, this._newOrderFieldsets.roomsView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderGuests = function () {
    this._newOrderFieldsets.guestsView = new NewOrderGuestsView({
      options: guestsOptions,
    });
    render(this._newOrderFormView, this._newOrderFieldsets.guestsView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderFeatures = function () {
    this._newOrderFieldsets.featuresView = new FeaturesView({
      options: featuresOptions,
      type: 'newOrder',
    });

    render(this._newOrderFormView, this._newOrderFieldsets.featuresView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderDescription = function () {
    this._newOrderFieldsets.descriptionView = new NewOrderDescriptionView();

    render(this._newOrderFormView, this._newOrderFieldsets.descriptionView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderPhotosLoader = function () {
    this._newOrderFieldsets.photosLoaderView = new NewOrderPhotosLoaderView();

    render(this._newOrderFormView, this._newOrderFieldsets.photosLoaderView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._renderButtons = function () {
    this._newOrderFieldsets.buttonsView = new NewOrderButtonsView();

    render(this._newOrderFormView, this._newOrderFieldsets.buttonsView, RenderPosition.BEFORE_END);
  };

  NewOrderPresenter.prototype._activate = function () {
    if (this._newOrderFormView.isHasToggleState()) {
      this._newOrderFormView.toggleState();
    }

    var fieldsets = Object.keys(this._newOrderFieldsets);

    for (var index = 0; index < fieldsets.length; index++) {
      var fieldset = fieldsets[index];
      this._newOrderFieldsets[fieldset].disable(false);
    }
  };

  NewOrderPresenter.prototype._reset = function () {
    if (
      this._appModel.getState() === AppState.DEACTIVATED && this._newOrderFormView.isHasToggleState()
    ) {
      return;
    }

    if (!this._newOrderFormView.isHasToggleState()) {
      this._newOrderFormView.toggleState();
    }

    var fieldsets = Object.keys(this._newOrderFieldsets);

    for (var index = 0; index < fieldsets.length; index++) {
      var fieldset = fieldsets[index];
      this._newOrderFieldsets[fieldset].disable(true);

      if (this._newOrderFieldsets[fieldset].reset) {
        this._newOrderFieldsets[fieldset].reset();
      }
    }

    this._appModel.setState(ActionType.DEACTIVATE_APP, AppState.DEACTIVATED);
  };

  NewOrderPresenter.prototype._handleSubmit = function (evt) {
    if (evt.target.checkValidity()) {
      Api.addOrder(new FormData(evt.target))
        .then(this._uploadNewOrderSucces)
        .catch(this._uploadNewOrderError);
    }
  };

  NewOrderPresenter.prototype._handleReset = function () {
    this._reset();
  };

  NewOrderPresenter.prototype._uploadNewOrderSucces = function () {
    this._ordersModel.setOrder(ActionType.ORDER_UPLOADED);
    this._reset();
  };

  NewOrderPresenter.prototype._uploadNewOrderError = function () {
    this._ordersModel.setOrder(ActionType.ERROR);
  };

  NewOrderPresenter.prototype._handleTypeChage = function (type) {
    var minPrice = typeToMinPrice[type];

    this._newOrderFieldsets.priceView.setMinPrice(minPrice);
  };

  NewOrderPresenter.prototype._handleRoomsChage = function (rooms) {
    this._newOrderFieldsets.guestsView.setGuests(rooms);
  };

  NewOrderPresenter.prototype._handleModelEvent = function (actionType, _payload) {
    switch (actionType) {
      case ActionType.ACTIVATE_APP:
        this._activate();
        break;
      case ActionType.DEACTIVATE_APP:
        this._reset();
        break;
    }
  };

  window.NewOrderPresenter = NewOrderPresenter;
})();
