'use strict';
(function () {
  // Количество комнат по умолчанию для филтра
  var DEFAULT_ROOMS = 1;
  // Значения для валидации
  var ValidateValue = {
    NOT_GUESTS: 0,
    MAX_ROOMS_COUNT: 100,
  };
  // Текст сообщений при ошибках валидации
  var ErrorMessage = {
    NO_ERROR: '',
    MAX_ROOMS: 'Для 100 комнат должен быть выбран тип "не для гостей"',
    INVALID_COUNT_GUESTS: 'Не корректное количество гостей. Количество гостей дожно быть не более ',
    ROOMS_SMALLER: 'Количество гостей не должно превышать ',
    NOT_GUESTS: 'Для типа "не для гостей" должно быть выбрано 100 комнат',
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
  };

  /**
   * @description Очистка полей комнат и гостей от ошибок
   */
  AdFormController.prototype._clearValidityRoomsAndGuests = function () {
    this._adForm.getAdRooms().setCustomValidity(ErrorMessage.NO_ERROR);
    this._adForm.getAdGuests().setCustomValidity(ErrorMessage.NO_ERROR);
  };

  /**
   * @description Проверка на наличие ошибки при максимальном количестве комнат или если тип не для гостей
   * @param {} roomsCount Количество комнат
   * @param {*} guestsCount Количество гостей
   * @param {*} message Текст сообщения об ошибке
   * @param {*} $error DOM элемент, которому необходимо установить ошибку
   */

  AdFormController.prototype._validateValuesRoomsAndGuests = function (roomsCount, guestsCount, message, $error) {
    if ((roomsCount >= guestsCount) && (guestsCount !== ValidateValue.NOT_GUESTS)) {
      this._clearValidityRoomsAndGuests();
    } else {
      $error.setCustomValidity(message);
    }
  };

  /**
   * @description Проверка на наличие ошибки при максимальном количестве комнат или если тип не для гостей
   * @param {number} count Количество комнат или количество гостей
   * @param {number} specialCount Свойство объекта ValidateValue
   * @param {string} message Текст сообщения об ошибке
   * @param {Object} $error DOM элемент, которому необходимо установить ошибку
   */
  AdFormController.prototype._validityRoomsCountOrGuestsCount = function (count, specialCount, message, $error) {
    if (count === specialCount) {
      this._clearValidityRoomsAndGuests();
    } else {
      $error.setCustomValidity(message);
    }
  };

  /**
   * Валидация филтров количества комнат и количества гостей
   */

  AdFormController.prototype._onValidityRoomsAndGuests = function () {
    var roomsCount = parseInt(this._adForm.getAdRooms().value, 10);
    var guestsCount = parseInt(this._adForm.getAdGuests().value, 10);

    if (roomsCount === ValidateValue.MAX_ROOMS_COUNT) {
      this._validityRoomsCountOrGuestsCount(
          guestsCount,
          ValidateValue.NOT_GUESTS,
          ErrorMessage.MAX_ROOMS,
          this._adForm.getAdGuests()
      );
    } else if (guestsCount === ValidateValue.NOT_GUESTS) {
      this._validityRoomsCountOrGuestsCount(
          roomsCount,
          ValidateValue.MAX_ROOMS_COUNT,
          ErrorMessage.NOT_GUESTS,
          this._adForm.getAdRooms()
      );
    } else {
      this._validateValuesRoomsAndGuests(
          roomsCount,
          guestsCount,
          ErrorMessage.INVALID_COUNT_GUESTS + roomsCount,
          this._adForm.getAdGuests()
      );
    }
  };

  AdFormController.prototype._setEventListeners = function () {
    this._adForm.onChangeAdRooms = this._onValidityRoomsAndGuests.bind(this);
    this._adForm.onChangeAdGuests = this._onValidityRoomsAndGuests.bind(this);
  };

  window.AdFormController = AdFormController;
})();
