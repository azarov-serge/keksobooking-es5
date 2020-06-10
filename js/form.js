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
   * @description Переключает элементы фильтра количества гостей: enabled || diasabled
   * @param {string} validValue
   */

  function disabledGuestsValues(validValue) {
    var NOT_GUESTS = window.Constant.NOT_GUESTS;
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
    $adGuests.querySelectorAll('option').forEach(toggleItem);
  }

  /**
   * @description Валидация количества комннат
   */
  function validateRooms() {
    // Значение количества комнат
    var roomsCount = parseInt($adRooms.value, 10);
    $adGuests.value = setGuests(roomsCount);
    disabledGuestsValues($adGuests.value);
  }
  // Установка значений фильтра количество комнат по умолчанию
  $adRooms.value = window.Constant.DEFAULT_ROOMS;
  // Установка значений количества филтров в соответствии с количеством комнат
  $adGuests.value = setGuests($adRooms.value);
  // Отключение значений гостей, не подходящих по условию
  disabledGuestsValues($adRooms.value);
  // Деактивировать fieldsets формы
  toggleFieldSets();

  $adRooms.addEventListener('change', function () {
    validateRooms();
  });

  $adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      evt.target.action = window.Constant.Url.UPLOAD;
    }
  });

  window.adForm = adForm;
})();
