'use strict';
(function () {
  // Форма для размещения объявления
  var $adForm = document.querySelector('.ad-form');
  // Input с адрессом
  var $adAddress = $adForm.querySelector('#address');
  // Список вариантов количества комнат
  var $adRooms = $adForm.querySelector('#room_number');
  // Список вариантов количества гостей
  var $adGuests = $adForm.querySelector('#capacity');

  // "Объект-модуль" формы для работы в других модулях
  var adForm = {
    toggleAdForm: toggleAdForm,
    setAddress: setAddress,
  };

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

  /**
   * @description Переключает fieldsets формы: enabled || diasabled
   */
  function toggleFieldSets() {
    $adForm.querySelectorAll('fieldset').forEach(function ($fieldset) {
      $fieldset.disabled = !$fieldset.disabled;
    });
  }

  /**
   * @description Переключает форму: enabled || diasabled
   */
  function toggleAdForm() {
    $adForm.classList.toggle('ad-form--disabled');
    toggleFieldSets();
  }

  /**
   * @description Конвертирует координату в число, удаляет "px" если есть
   * @param {*} coord Координата
   */

  function checkCoord(coord) {
    return parseInt(String(coord).replace('px', ''), 10);
  }
  /**
   * @description Устанавливает координаты mainPin в Input с адрессом
   * @param {*} x Координата X
   * @param {*} y Координата Y
   */

  function setAddress(x, y) {
    // Координата mainPin
    var coords = window.coords.create();
    coords = {
      x: checkCoord(x),
      y: checkCoord(y)
    };

    window.coords.convertToLocation(coords);
    $adAddress.value = coords.x + ', ' + coords.y;
  }

  /**
   * @param {number} rooms Количество комнат
   * @return {number} Количество гостей
   */

  function setGuests(rooms) {
    if (rooms === window.Constant.MAX_ROOMS_COUNT) {
      return window.Constant.NOT_GUESTS;
    } else {
      return rooms;
    }
  }

  /**
   * @description Очистка полей комнат и гостей от ошибок
   */
  function clearValidityRoomsAndGuests() {
    $adRooms.setCustomValidity(ErrorMessage.NO_ERROR);
    $adGuests.setCustomValidity(ErrorMessage.NO_ERROR);
  }

  /**
   * @description Проверка на наличие ошибки при максимальном количестве комнат или если тип не для гостей
   * @param {} roomsCount Количество комнат
   * @param {*} guestsCount Количество гостей
   * @param {*} message Текст сообщения об ошибке
   * @param {*} $error DOM элемент, которому необходимо установить ошибку
   */

  function validateValuesRoomsAndGuests(roomsCount, guestsCount, message, $error) {
    if ((roomsCount >= guestsCount) && (guestsCount !== ValidateValue.NOT_GUESTS)) {
      clearValidityRoomsAndGuests();
    } else {
      $error.setCustomValidity(message);
    }
  }

  /**
   * @description Проверка на наличие ошибки при максимальном количестве комнат или если тип не для гостей
   * @param {number} count Количество комнат или количество гостей
   * @param {number} specialCount Свойство объекта ValidateValue
   * @param {string} message Текст сообщения об ошибке
   * @param {Object} $error DOM элемент, которому необходимо установить ошибку
   */
  function validityRoomsCountOrGuestsCount(count, specialCount, message, $error) {
    if (count === specialCount) {
      clearValidityRoomsAndGuests();
    } else {
      $error.setCustomValidity(message);
    }
  }

  /**
   * Валидация филтров количества комнат и количества гостей
   */

  function validityRoomsAndGuests() {
    var roomsCount = parseInt($adRooms.value, 10);
    var guestsCount = parseInt($adGuests.value, 10);

    if (roomsCount === ValidateValue.MAX_ROOMS_COUNT) {
      validityRoomsCountOrGuestsCount(
          guestsCount,
          ValidateValue.NOT_GUESTS,
          ErrorMessage.MAX_ROOMS,
          $adGuests
      );
    } else if (guestsCount === ValidateValue.NOT_GUESTS) {
      validityRoomsCountOrGuestsCount(
          roomsCount,
          ValidateValue.MAX_ROOMS_COUNT,
          ErrorMessage.NOT_GUESTS,
          $adRooms
      );
    } else {
      validateValuesRoomsAndGuests(
          roomsCount,
          guestsCount,
          ErrorMessage.INVALID_COUNT_GUESTS + roomsCount,
          $adGuests
      );
    }
  }


  // Установка значений фильтра количество комнат по умолчанию
  $adRooms.value = DEFAULT_ROOMS;
  // Установка значений количества филтров в соответствии с количеством комнат
  $adGuests.value = setGuests($adRooms.value);
  // Деактивировать fieldsets формы
  toggleFieldSets();

  $adRooms.addEventListener('change', function () {
    validityRoomsAndGuests();
  });

  $adGuests.addEventListener('change', function () {
    validityRoomsAndGuests();
  });

  $adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      evt.target.action = window.Constant.Url.UPLOAD;
    }
  });

  window.adForm = adForm;
})();
