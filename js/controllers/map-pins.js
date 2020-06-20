'use strict';
(function () {
  var Constant = window.Constant;
  var CoordsUtil = window.CoordsUtil;
  var Util = window.Util;

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
    this._$cardContainer = null;
    this._$cardPlace = null;
  }

  MapPinsController.prototype.activate = function () {
    // Установить главный пин по умолчанию
    this.setDefaultMainPin();
  };

  MapPinsController.prototype.deactivate = function () {
    // Установить главный пин по умолчанию
    this.setDefaultMainPin();
    // Удалить пины
    this.removePins();
    // Удалить активную карточку
    this._removeActiveCard();
  };

  /**
   * @description Устанавливает главный пин по умолчанию
   */

  MapPinsController.prototype.setDefaultMainPin = function () {
    this._mapPinsComponent.getMainPin().style.left = Default.MAIN_PIN_LEFT + 'px';
    this._mapPinsComponent.getMainPin().style.top = Default.MAIN_PIN_TOP + 'px';
  };

  /**
   * @description Возвращает соординаты главного пина по умолчанию (до активации карты)
   */

  MapPinsController.prototype.getMainPinDefaultCoords = function () {
    return {
      x: Math.floor(Default.MAIN_PIN_LEFT + this._mapPinsComponent.getMainPin().offsetWidth / 2),
      y: Math.floor(Default.MAIN_PIN_TOP + this._mapPinsComponent.getMainPin().offsetHeight / 2),
    };
  };

  /**
   * @description Возвращает соординаты главного пина после активации карты
   */

  MapPinsController.prototype.getMainPinCoords = function () {
    return CoordsUtil.convertToCoords(
        this._mapPinsComponent.getMainPin().style.left,
        this._mapPinsComponent.getMainPin().style.top
    );
  };

  /**
   *@description Отрисовывает пины в контейнере
   */

  MapPinsController.prototype.renderPins = function () {
    // Если пины есть
    if (this._pinComponents) {
      // Удалить пины
      this.removePins();
      // Удалить активную карточку, если она есть
      this._removeActiveCard();
    }

    var $pins = [];
    // Создать массив пин компонентов
    this._createPinsComponents();
    // Создать массив пин элементов для рендеринга
    this._pinComponents.forEach(function (pinComponent) {
      $pins.push(pinComponent.getElement());
    });

    // Отрисовать пины на карте
    Util.render(this._mapPinsComponent.getElement(), $pins, this._mapPinsComponent.getMainPin());
    // Установить обработчики событий для контейнера с пинами (делегирование по клику на пин и нажатие Enter на пин)
    this._setMapPinsClickHandler();
    // Запустить обработчики событий для контейнера с пинами (делегирование по клику на пин и нажатие Enter на пин)
    this._mapPinsComponent.addMainMapListeners();
  };

  /**
   * @description Удаляет пины с карты если они есть
   */

  MapPinsController.prototype.removePins = function () {
    this._pinComponents.forEach(function (pinComponent) {
      // Удалить компонент
      pinComponent.remove();
    });
    // Очистить список компонентов
    this._pinComponents = [];
    // Удалить обработчики событий для контейнера с пинами (делегирование по клику на пин и нажатие Enter на пин)
    this._mapPinsComponent.removeMainMapListeners();
  };

  /**
   * @description Устанавливает контейнер, куда отрисовывать карточку
   * @param {Object} $cardContainer Контейнер, куда отрисовывать карточку
   */
  MapPinsController.prototype.setCardContainer = function ($cardContainer) {
    this._$cardContainer = $cardContainer;
  };

  /**
   * @description Устанавливает место, куда отрисовывать карточку
   * @param {Object} $cardPlace Место, куда отрисовывать карточку
   */

  MapPinsController.prototype.setCardPlace = function ($cardPlace) {
    this._$cardPlace = $cardPlace;
  };

  /**
   * @description Создать список компонентов по полученным данным не более чем Constant.ORDERS_COUNT (см. файл constant.js)
   */

  MapPinsController.prototype._createPinsComponents = function () {
    this._pinComponents = this._ordersModel.getOrders().slice(0, Constant.ORDERS_COUNT).map(function (order, index) {
      // Создать новый копонент пина
      var pinComponent = new window.PinComponent(order, index);
      return pinComponent;
    });
  };

  /**
   * @description Устанавливает callbacks для обработчиков событий для контенера с пинами
   */

  MapPinsController.prototype._setMapPinsClickHandler = function () {
    this._mapPinsComponent.mainPinClickHandler = this._mainPinClickHandler.bind(this);
    this._mapPinsComponent.mainPinKeyDownHandler = this._mainPinKeyDownHandler.bind(this);
  };


  /**
   * @description Callbak для события клик на контенере с пинами
   */

  MapPinsController.prototype._mainPinClickHandler = function (evt) {
    if (this._isPinClicked(evt.target)) {
      evt.preventDefault();
      // Активировать нажатый пин и отрисовать его карточку
      this._renderActiveCardAndActivatePin(evt.target.dataset.orderIndex || evt.target.parentElement.dataset.orderIndex);
    }
  };

  /**
   * @description Callbak для события нажатие клавиши на контенере с пинами
   */

  MapPinsController.prototype._mainPinKeyDownHandler = function (evt) {
    if (Util.isEnterPressed(evt)) {
      evt.preventDefault();
      // Использовать callbak клика (активировать нажатый пин и отрисовать его карточку)
      this._mainPinClickHandler(evt);
    }
  };

  /**
   * @description Активирует нажатый пин и отрисовывает его карточку
   */

  MapPinsController.prototype._renderActiveCardAndActivatePin = function (index) {
    // Активировать пин по индексу
    this._activatePin(index);
    // Отрисовать карточку пина по индексу
    this._renderActiveCard(index);
  };

  /**
   * @description Проверяет, является нажатый элемент пином или нет
   * @param {Object} $element
   * @return {boolean}
   */

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

  /**
   * @description Деактивирует активный пин, если он есть
   */

  MapPinsController.prototype._deactivatePin = function () {
    if (this._activePinComponent) {
      // Деактивировать нажатый пин
      this._activePinComponent.toggleState();
      // Очистить активный пин
      this._activePinComponent = null;
    }
  };

  /**
   * @description Активирует активный пин, если он есть
   */

  MapPinsController.prototype._activatePin = function (index) {
    // Деактивировать активный пин, если он есть
    this._deactivatePin();
    // Установить активный пин
    this._activePinComponent = this._pinComponents[index];
    // Активировать нажатый пин
    this._activePinComponent.toggleState();
  };

  /**
   * @description Удаляет активную карточку, если она есть
   */

  MapPinsController.prototype._removeActiveCard = function () {
    if (this._activeCardComponent) {
      // Удалить активную карточку
      this._activeCardComponent.remove();
      // Очистить активную карточку
      this._activeCardComponent = null;
    }
  };

  /**
   * @description Отрисовывает активную карточку, добовляет обработчики событий для неё
   */

  MapPinsController.prototype._renderActiveCard = function (index) {
    // Удалить активную карточку, если она есть
    this._removeActiveCard();
    // Создать новую карточку и установить в переменную
    this._activeCardComponent = new window.CardComponent(this._ordersModel.getOrderByIndex(index));
    // Отрисовать карточку на карте
    this._activeCardComponent.render(this._$cardContainer, this._$cardPlace);
    // Установить обработчики событий для карточку
    this._setCloseCardHandler();
    // Запустить обработчики событий для карточки
    this._activeCardComponent.addCardListeners();
  };

  /**
   * @description Устанавливает callbacks для обработчиков событий карточки
   */

  MapPinsController.prototype._setCloseCardHandler = function () {
    this._activeCardComponent.closeCardClickHandler = this._closeCardClickHandler.bind(this);
    this._activeCardComponent.documentKeyDownHandler = this._documentKeyDownHandler.bind(this);
  };

  /**
   * @description Callback для клика кнопки закрыть у карточке (удалить карточку и деактивировать пин карточки)
   */

  MapPinsController.prototype._closeCardClickHandler = function () {
    // Удалить обработчики событий карточки
    this._activeCardComponent.removeCardListeners();
    // Удалить карточку
    this._removeActiveCard();
    // Деактивировать пин карточки
    this._deactivatePin();
  };

  /**
   * @description Callback для document (нажатие кнопки Esc для закрытия карточки)
   */

  MapPinsController.prototype._documentKeyDownHandler = function (evt) {
    if (Util.isEscPressed(evt)) {
      evt.preventDefault();
      // Использовать callback для клика кнопки закрыть у карточке (удалить карточку и деактивировать пин карточки)
      this._closeCardClickHandler();
    }
  };

  window.MapPinsController = MapPinsController;
})();
