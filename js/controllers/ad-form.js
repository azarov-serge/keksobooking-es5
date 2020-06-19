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
    // Синхронизация fieldsets и form
    if (this._adFormComponent.isActivate() !== this._adFormComponent.isActivateFieldsets()) {
      this._adFormComponent.toggleStateFieldsets();
    }

    // Установка значений по умолчанию
    this.setDefaultValues();
  };

  AdFormController.prototype.startValidate = function () {
    // Дизейблим для корректной валидации
    this._adFormComponent.getAdAddress().disabled = true;
    // Для валидации аватара, загрузка только JPEG и PNG
    this._adFormComponent.getAdAvatar().accept = ValidateValue.IMAGES_TYPE;
    // Для валидации изображений объявлений, загрузка только JPEG и PNG
    this._adFormComponent.getAdImages().accept = ValidateValue.IMAGES_TYPE;
    // Для валидации, установка максимальной цены
    this._adFormComponent.getAdPrice().max = ValidateValue.MAX_PRICE;
    // Установка валидации заголовка объявления
    this._setValidityTitle();
    // Установка валидации количества комнат
    this._adFormComponent.setAdRoomsChangeHandler(this._adRoomsChangeHandler.bind(this));
    // Установка валидации цены от типа
    this._adFormComponent.setAdTypeChangeHandler(this._adTypeChangeHandler.bind(this));
    // Установка валидации времени заезда
    this._adFormComponent.setAdCheckInChangeHandler(this._adCheckInChangeHandler.bind(this));
    // Установка валидации времени заезда
    this._adFormComponent.setAdCheckOutChangeHandler(this._adCheckOutChangeHandler.bind(this));
    // Установка функции для события submit у формы
    this._adFormComponent.setAdFormSubmitHandler(this._adFormSubmitHandler.bind(this));
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
    // Установка значений фильтра количество комнат по умолчанию
    this._adFormComponent.getAdRooms().value = Default.ROOMS;
    // Установка значений количества фильтров в соответствии с количеством комнат
    this._adFormComponent.getAdGuests().value = this._getGuests(Default.ROOMS);
    // Отключить количетсво гостей, которые не прошли валидацию
    this._disabledGuestsValues(Default.ROOMS);
    // Установить тип жилья по умолчанию
    this._adFormComponent.getAdType().value = Default.TYPE;
    // Установить минимальную стоимость для данного типа
    this._setMinPrice(window.Constant.bookingTypes[Default.TYPE].minPrice);
    // Установить время заезда
    this._adFormComponent.getAdCheckIn().value = Default.CHECK_IN;
    // Установить время выезда, в зависимости от времени заезда
    this._adFormComponent.getAdCheckOut().value = this._adFormComponent.getAdCheckIn().value;
    // Установить текст объявления по умолчанию
    this._adFormComponent.getAdDescription().textContent = Default.TITLE;
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
    var minPrice = Constant.bookingTypes[evt.target.value].minPrice;
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
    evt.preventDefault();
    if (evt.target.checkValidity()) {
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
