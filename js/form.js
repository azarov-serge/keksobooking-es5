'use strict';
(function () {
  // Количество комнат по умолчанию для филтра
  var DEFAULT_ROOMS = 1;
  // Значения для валидации
  var ValidateValue = {
    NOT_GUESTS: 0,
    MAX_ROOMS_COUNT: 100,
  };

  function AdFormController(adForm) {
    this._adForm = adForm;
    this._setDefaultValues();
  }

  AdFormController.prototype.activate = function () {
    this._setEventListeners();
    this._adForm.startEventListeners();
  };

  /**
   * @param {number} rooms Количество комнат
   * @return {number} Количество гостей
   */

  AdFormController.prototype._getGuests = function (rooms) {
    if (rooms === ValidateValue.MAX_ROOMS_COUNT) {
      return ValidateValue.NOT_GUESTS;
    } else {
      return rooms;
    }
  };

  AdFormController.prototype._setDefaultValues = function () {
    // Установка значений фильтра количество комнат по умолчанию
    this._adForm.getAdRooms().value = DEFAULT_ROOMS;
    // Установка значений количества филтров в соответствии с количеством комнат
    this._adForm.getAdGuests().value = this._getGuests(DEFAULT_ROOMS);
    this._disabledGuestsValues(DEFAULT_ROOMS);
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
   * @description Валидация количества комннат
   */

  AdFormController.prototype._validateRooms = function (evt) {
    // Значение количества комнат
    var roomsCount = parseInt(evt.target.value, 10);
    this._adForm.getAdGuests().value = this._getGuests(roomsCount);
    this._disabledGuestsValues(this._adForm.getAdGuests().value);
  };

  AdFormController.prototype._setEventListeners = function () {
    this._adForm.onChangeAdRooms = this._validateRooms.bind(this);
  };

  window.AdFormController = AdFormController;
})();
