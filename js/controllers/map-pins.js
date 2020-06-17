'use strict';
(function () {
  var Coords = window.Coords;
  var Utils = window.Utils;

  var Default = {
    MAIN_PIN_LEFT: 570,
    MAIN_PIN_TOP: 357,
  };

  var PIN_CLASS_NAME = 'map__pin';
  var MAIN_PIN_CLASS_NAME = 'map__pin--main';

  function MapPinsController(mapPinsComponent, ordersModel) {
    this._mapPinsComponent = mapPinsComponent;
    this._ordersModel = ordersModel;
    this._pinComponents = [];
    this._activePinComponent = null;
    this._activeCardComponent = null;
    this._mainPinClickHandler = this.__mainPinClickHandler.bind(this);
    this._mainPinKeyDownHandler = this.__mainPinKeyDownHandler.bind(this);
    this._$cardContainer = null;
    this._$cardPlace = null;
  }

  MapPinsController.prototype.activate = function () {
    this.setDefaultMainPin();
  };

  MapPinsController.prototype.setDefaultMainPin = function () {
    this._mapPinsComponent.getMainPin().style.left = Default.MAIN_PIN_LEFT + 'px';
    this._mapPinsComponent.getMainPin().style.top = Default.MAIN_PIN_TOP + 'px';
  };

  MapPinsController.prototype.getMainPinDefaultCoords = function () {
    return {
      x: Math.floor(Default.MAIN_PIN_LEFT + this._mapPinsComponent.getMainPin().offsetWidth / 2),
      y: Math.floor(Default.MAIN_PIN_TOP + this._mapPinsComponent.getMainPin().offsetHeight / 2),
    };
  };

  MapPinsController.prototype.getMainPinCoords = function () {
    return Coords.convertToCoords(
        this._mapPinsComponent.getMainPin().style.left,
        this._mapPinsComponent.getMainPin().style.top
    );
  };

  MapPinsController.prototype.renderPins = function () {
    if (this._pinComponents) {
      this.removePins();
    }

    var $pins = [];
    // Создать массив пин компонентов
    this._createPinsComponents();
    // Создать массив пин элементов для рендеринга
    this._pinComponents.forEach(function (pinComponent) {
      $pins.push(pinComponent.getElement());
    });
    // Отрисовать пины на карте
    Utils.render(this._mapPinsComponent.getElement(), $pins, this._mapPinsComponent.getMainPin());
    this._setMapPinsClickHandler();
  };

  MapPinsController.prototype.removePins = function () {
    this._pinComponents.forEach(function (pinComponent) {
      pinComponent.remove();
    });
    this._pinComponents = [];
  };

  MapPinsController.prototype.setCardContainer = function ($cardContainer) {
    this._$cardContainer = $cardContainer;
  };

  MapPinsController.prototype.setCardPlace = function ($cardPlace) {
    this._$cardPlace = $cardPlace;
  };

  MapPinsController.prototype.deactivate = function () {
    this._mapPinsComponent.getElement().removeEventListener('click', this._mainPinClickHandler);
    this._mapPinsComponent.getElement().removeEventListener('keydown', this._mainPinKeyDownHandler);
  };

  MapPinsController.prototype._createPinsComponents = function () {
    this._pinComponents = this._ordersModel.getOrders().map(function (order, index) {
      var pinComponent = new window.PinComponent(order, index);
      return pinComponent;
    });
  };

  MapPinsController.prototype._setMapPinsClickHandler = function () {
    this._mapPinsComponent.getElement().addEventListener('click', this._mainPinClickHandler);
    this._mapPinsComponent.getElement().addEventListener('keydown', this._mainPinKeyDownHandler);
  };

  MapPinsController.prototype.__mainPinClickHandler = function (evt) {
    if (this._isPinClicked(evt.target)) {
      this._renderActiveCard(evt.target.dataset.orderIndex || evt.target.parentElement.dataset.orderIndex);
    }
  };

  MapPinsController.prototype.__mainPinKeyDownHandler = function (evt) {
    if (Utils.isEnterPressed(evt)) {
      this._mainPinClickHandler(evt);
    }
  };

  MapPinsController.prototype._isPinClicked = function ($element) {
    return (
      (
        ($element.classList.contains(PIN_CLASS_NAME)) && (!$element.classList.contains(MAIN_PIN_CLASS_NAME))
      )
      ||
      (
        ($element.parentElement.classList.contains(PIN_CLASS_NAME)) && (!$element.parentElement.classList.contains(MAIN_PIN_CLASS_NAME))
      )
    );
  };

  MapPinsController.prototype._removeActiveCard = function () {
    if (this._activeCardComponent) {
      this._activeCardComponent.remove();
      this._activeCardComponent = null;
    }
  };

  MapPinsController.prototype._renderActiveCard = function (index) {
    this._removeActiveCard();

    this._activeCardComponent = new window.CardComponent(this._ordersModel.getOrderByIndex(index));
    this._activeCardComponent.render(this._$cardContainer, this._$cardPlace);
    this._activeCardComponent.setCloseCardHandler(this._removeActiveCard.bind(this));
  };

  window.MapPinsController = MapPinsController;
})();
