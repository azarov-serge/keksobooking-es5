'use strict';
(function () {
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

  function AdFormController(adForm) {
    this._adForm = adForm;
  }

  AdFormController.prototype.activate = function () {
    // Синхронизация fieldsets и form
    if (this._adForm.isActivate() !== this._adForm.isActivateFieldsets()) {
      this._adForm.toggleStateFieldsets();
    }

    // Установка значений по умолчанию
    this.setDefaultValues();
  };

  AdFormController.prototype.startValidate = function () {
    // Дизейблим для корректной валидации
    this._adForm.getAdAddress().disabled = true;
    // Для валидации аватара, загрузка только JPEG и PNG
    this._adForm.getAdAvatar().accept = ValidateValue.IMAGES_TYPE;
    // Для валидации изображений объявлений, загрузка только JPEG и PNG
    this._adForm.getAdImages().accept = ValidateValue.IMAGES_TYPE;
    // Для валидации, установка максимальной цены
    this._adForm.getAdPrice().maxValue = ValidateValue.MAX_PRICE;
    // Установка валидации заголовка объявления
    this._setValidityTitle();
    // Установка валидации количества комнат
    this._adForm.setOnChangeAdRooms(this._onChangeAdRooms.bind(this));
    // Установка валидации цены от типа
    this._adForm.setOnChangeAdType(this._onChangeAdType.bind(this));
    // Установка валидации времени заезда
    this._adForm.setOnChangeAdCheckIn(this._onChangeAdCheckIn.bind(this));
    // Установка валидации времени заезда
    this._adForm.setOnChangeAdCheckOut(this._onChangeAdCheckOut.bind(this));
    // Установка функции для события submit у формы
    this._adForm.setOnSubmitAdForm(this._onSubmitAdForm.bind(this));
  };

  AdFormController.prototype.setDefaultValues = function () {
    // Значения по умолчанию
    var Default = {
      ROOMS: this._adForm.getAdRooms()[DefaultIndex.ROOMS].value,
      TYPE: this._adForm.getAdType()[DefaultIndex.TYPE].value,
      CHECK_IN: this._adForm.getAdCheckIn()[DefaultIndex.CHECK_IN].value,
    };

    // Установка значений фильтра количество комнат по умолчанию
    this._adForm.getAdRooms().value = Default.ROOMS;
    // Установка значений количества фильтров в соответствии с количеством комнат
    this._adForm.getAdGuests().value = this._getGuests(Default.ROOMS);
    this._disabledGuestsValues(Default.ROOMS);
    this._adForm.getAdType().value = Default.TYPE;
    this._setMinPrice(window.Constant.bookingTypes[Default.TYPE].minPrice);
    this._adForm.getAdCheckIn().value = Default.CHECK_IN;
    this._adForm.getAdCheckOut().value = this._adForm.getAdCheckIn().value;
  };

  /**
   * @description Валидация заголовка
   */

  AdFormController.prototype._setValidityTitle = function () {
    this._adForm.getAdTitle().required = true;
    this._adForm.getAdTitle().minLength = ValidateValue.TITLE_MIN_LENGTH;
    this._adForm.getAdTitle().maxLength = ValidateValue.TITLE_MAX_LENGTH;
  };

  /**
   * @description Валидация количества комнат
   */

  AdFormController.prototype._onChangeAdRooms = function (evt) {
    // Значение количества комнат
    var roomsCount = parseInt(evt.target.value, 10);
    this._adForm.getAdGuests().value = this._getGuests(roomsCount);
    this._disabledGuestsValues(this._adForm.getAdGuests().value);
  };

  /**
   * @description Валидация цен типа жилья
   */

  AdFormController.prototype._onChangeAdType = function (evt) {
    // Значение количества комнат
    var minPrice = window.Constant.bookingTypes[evt.target.value].minPrice;
    this._setMinPrice(minPrice);
  };

  /**
   * @description Валидация времени заезада
   */

  AdFormController.prototype._onChangeAdCheckIn = function (evt) {
    this._adForm.getAdCheckOut().value = evt.target.value;
  };

  /**
   * @description Валидация времени выезда
   */

  AdFormController.prototype._onChangeAdCheckOut = function (evt) {
    this._adForm.getAdCheckIn().value = evt.target.value;
  };

  /**
   *
   * @description Функции для события submit у формы
   */

  AdFormController.prototype._onSubmitAdForm = function (evt) {
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
    this._adForm.getAdGuests().querySelectorAll('option').forEach(toggleItem);
  };

  /**
   * @description Валидация цен типа жилья
   */

  AdFormController.prototype._setMinPrice = function (minPrice) {
    // Значение количества комнат
    this._adForm.getAdPrice().placeholder = minPrice;
    this._adForm.getAdPrice().minValue = minPrice;
  };

  window.AdFormController = AdFormController;
})();
