'use strict';
(function () {

  var Constants = {
    ORDER_COUNT: 8,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 82,
    MAP_MIN_X: 0,
    MAP_MAX_X: 1200,
    MAP_MIN_Y: 130,
    MAP_MAX_Y: 630,
    BOOKING_TYPES: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало',
    },
    ROOM_TEXTS: ['комната', 'комнаты', 'комнат'],
    GUEST_TEXTS: ['гостя', 'гостей', 'гостей'],
  };

  window.Constants = Constants;
})();
