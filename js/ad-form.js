'use strict';
(function () {
  // Количество комнат по умолчанию для филтра
  var DEFAULT_ROOMS = 1;
  // Значения для валидации
  var ValidateValue = {
    TITLE_MIN_LENGTH: 30,
    TITLE_MAX_LENGTH: 100,
    NOT_GUESTS: 0,
    MAX_ROOMS_COUNT: 100,
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
    this._adForm.getAdAddress().disabled = true;
    this._adForm.getAdAvatar().accept = ValidateValue.IMAGES_TYPE;
    this._adForm.getAdImages().accept = ValidateValue.IMAGES_TYPE;
    this._setValidityTitle();
    this._adForm.setOnChangeAdRooms(this._onChangeAdRooms.bind(this));
    this._adForm.setOnSubmitAdForm(this._onSubmitAdForm.bind(this));
  };

  AdFormController.prototype.setDefaultValues = function () {
    // Установка значений фильтра количество комнат по умолчанию
    this._adForm.getAdRooms().value = DEFAULT_ROOMS;
    // Установка значений количества филтров в соответствии с количеством комнат
    this._adForm.getAdGuests().value = this._getGuests(DEFAULT_ROOMS);
    this._disabledGuestsValues(DEFAULT_ROOMS);
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
   * @description Валидация количества комннат
   */

  AdFormController.prototype._onChangeAdRooms = function (evt) {
    // Значение количества комнат
    var roomsCount = parseInt(evt.target.value, 10);
    this._adForm.getAdGuests().value = this._getGuests(roomsCount);
    this._disabledGuestsValues(this._adForm.getAdGuests().value);
  };


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

  window.AdFormController = AdFormController;
})();
