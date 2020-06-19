'use strict';
(function () {
  var Constant = window.Constant;
  var CoordsUtil = window.CoordsUtil;

  // Индекс значения по умолчанию
  var DefaultIndex = {
    ROOMS: 0,
    TYPE: 1,
    CHECK_IN: 0,
  };

  // Значения для валидации
  var ValidateValue = {
    TITLE_MIN_LENGTH: 30,
    TITLE_MAX_LENGTH: 100,
    NOT_GUESTS: 0,
    MAX_ROOMS_COUNT: 100,
    MAX_PRICE: 1000000,
    IMAGES_TYPE: 'image/png, image/jpeg',
  };

  function AdFormController(adFormComponent) {
    this._adFormComponent = adFormComponent;
  }

  AdFormController.prototype.activate = function () {
    // Синхронизировать fieldsets и form
    if (this._adFormComponent.isActivate() !== this._adFormComponent.isActivateFieldsets()) {
      this._adFormComponent.toggleStateFieldsets();
    }

    // Установить значение по умолчанию
    this.setDefaultValues();
  };

  AdFormController.prototype.run = function () {
    // Сделать поле адреес недоступным ("валидация" подя по ТЗ)
    this._adFormComponent.getAdAddress().disabled = true;
    // Установить валидацию аватара, загрузка только JPEG и PNG
    this._adFormComponent.getAdAvatar().accept = ValidateValue.IMAGES_TYPE;
    // Установить валидацию изображений объявлений, загрузка только JPEG и PNG
    this._adFormComponent.getAdImages().accept = ValidateValue.IMAGES_TYPE;
    // Установить валидацию, установка максимальной цены
    this._adFormComponent.getAdPrice().max = ValidateValue.MAX_PRICE;
    // Установить валидацию заголовка объявления
    this._setValidityTitle();
    // Установить функцию для обработчиков событий валидации
    this._setValidityHandlers();
    // Запустить обработчики событий для валидации формы
    this._adFormComponent.addAdFormValidityListeners();
    // Установить функцию для события submit у формы
    this._adFormComponent.adFormSubmitHandler = this._adFormSubmitHandler.bind(this);
    // Запустить обработчики событий для отправки формы
    this._adFormComponent.addAdFormSubmitListener();
  };

  AdFormController.prototype.stop = function () {
    // Установить значение по умолчанию
    this.setDefaultValues();
    // Удалить обработчики событий для валидации формы
    this._adFormComponent.removeAdFormValidityListeners();
    // Удалить обработчик событий для отправки формы
    this._adFormComponent.removeAdFormSubmitListener();
  };

  AdFormController.prototype.setAddress = function (coords) {
    coords = CoordsUtil.convertToLocation(coords);
    this._adFormComponent.getAdAddress().value = coords.x + ', ' + coords.y;
  };

  AdFormController.prototype.setDefaultValues = function () {
    // Значения по умолчанию
    var Default = {
      TITLE: '',
      ROOMS: this._adFormComponent.getAdRooms()[DefaultIndex.ROOMS].value,
      TYPE: this._adFormComponent.getAdType()[DefaultIndex.TYPE].value,
      CHECK_IN: this._adFormComponent.getAdCheckIn()[DefaultIndex.CHECK_IN].value,
      DESCRIPTION: '',
    };

    // Установить заголовок объявления по умолчанию
    this._adFormComponent.getAdTitle().textContent = Default.TITLE;
    // Установить значение фильтра количество комнат по умолчанию
    this._adFormComponent.getAdRooms().value = Default.ROOMS;
    // Установить значение количества фильтров в соответствии с количеством комнат
    this._adFormComponent.getAdGuests().value = this._getGuests(Default.ROOMS);
    // Отключить количетсво гостей, которые не прошли валидацию
    this._disabledGuestsValues(Default.ROOMS);
    // Установить тип жилья по умолчанию
    this._adFormComponent.getAdType().value = Default.TYPE;
    // Установить минимальную стоимость для данного типа
    this._setMinPrice(window.Constant.bookingType[Default.TYPE].minPrice);
    // Установить время заезда
    this._adFormComponent.getAdCheckIn().value = Default.CHECK_IN;
    // Установить время выезда, в зависимости от времени заезда
    this._adFormComponent.getAdCheckOut().value = this._adFormComponent.getAdCheckIn().value;
    // Установить текст объявления по умолчанию
    this._adFormComponent.getAdDescription().textContent = Default.TITLE;
  };

  AdFormController.prototype._setValidityHandlers = function () {
    // Установить валидацию количества комнат
    this._adFormComponent.adRoomsChangeHandler = this._adRoomsChangeHandler.bind(this);
    // Установить валидацию цены от типа
    this._adFormComponent.adTypeChangeHandler = this._adTypeChangeHandler.bind(this);
    // Установить валидацию времени заезда
    this._adFormComponent.adCheckInChangeHandler = this._adCheckInChangeHandler.bind(this);
    // Установить валидацию времени заезда
    this._adFormComponent.adCheckOutChangeHandler = this._adCheckOutChangeHandler.bind(this);
  };

  /**
   * @description Валидация заголовка
   */

  AdFormController.prototype._setValidityTitle = function () {
    this._adFormComponent.getAdTitle().required = true;
    this._adFormComponent.getAdTitle().minLength = ValidateValue.TITLE_MIN_LENGTH;
    this._adFormComponent.getAdTitle().maxLength = ValidateValue.TITLE_MAX_LENGTH;
  };

  /**
   * @description Валидация количества комнат
   */

  AdFormController.prototype._adRoomsChangeHandler = function (evt) {
    // Значение количества комнат
    var roomsCount = parseInt(evt.target.value, 10);
    this._adFormComponent.getAdGuests().value = this._getGuests(roomsCount);
    this._disabledGuestsValues(this._adFormComponent.getAdGuests().value);
  };

  /**
   * @description Валидация цен типа жилья
   */

  AdFormController.prototype._adTypeChangeHandler = function (evt) {
    // Значение количества комнат
    var minPrice = Constant.bookingType[evt.target.value].minPrice;
    this._setMinPrice(minPrice);
  };

  /**
   * @description Валидация времени заезада
   */

  AdFormController.prototype._adCheckInChangeHandler = function (evt) {
    this._adFormComponent.getAdCheckOut().value = evt.target.value;
  };

  /**
   * @description Валидация времени выезда
   */

  AdFormController.prototype._adCheckOutChangeHandler = function (evt) {
    this._adFormComponent.getAdCheckIn().value = evt.target.value;
  };

  /**
   *
   * @description Функции для события submit у формы
   */

  AdFormController.prototype._adFormSubmitHandler = function (evt) {
    if (evt.target.checkValidity()) {
      evt.preventDefault();
      evt.target.action = window.Constant.Url.UPLOAD;
    }
  };

  /**
   * @param {number} rooms Количество комнат
   * @return {number} Количество гостей
   */

  AdFormController.prototype._getGuests = function (rooms) {
    if (rooms === ValidateValue.MAX_ROOMS_COUNT) {
      return ValidateValue.NOT_GUESTS;
    }

    return rooms;
  };

  /**
   * @description Переключает элементы фильтра количества гостей: enabled || diasabled
   * @param {string} validValue
   */

  AdFormController.prototype._disabledGuestsValues = function (validValue) {
    var NOT_GUESTS = ValidateValue.NOT_GUESTS;

    /**
     * @description Переключает элемент фильтра: enabled || diasabled
     * @param {Object} $item Элемент филтра (option у select)
     */

    function toggleItem($item) {
      // Значение фильтра количество гостей
      var itemValue = parseInt($item.value, 10);
      if (validValue === NOT_GUESTS) {
        $item.disabled = itemValue !== validValue;
      } else {
        $item.disabled = !((itemValue <= validValue) && (itemValue !== NOT_GUESTS));
      }
    }

    validValue = parseInt(validValue, 10);
    this._adFormComponent.getAdGuests().querySelectorAll('option').forEach(toggleItem);
  };

  /**
   * @description Валидация цен типа жилья
   */

  AdFormController.prototype._setMinPrice = function (minPrice) {
    // Значение количества комнат
    this._adFormComponent.getAdPrice().placeholder = minPrice;
    this._adFormComponent.getAdPrice().min = minPrice;
  };

  window.AdFormController = AdFormController;
})();
