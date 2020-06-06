'use strict';
(function () {
  var Constant = {
    ORDER_COUNT: 8,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 82,
    MAP_MIN_X: 0,
    MAP_MAX_X: 1200,
    MAP_MIN_Y: 130,
    MAP_MAX_Y: 630,
    bookingTypes: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало',
    },
    roomTexts: ['комната', 'комнаты', 'комнат'],
    guestTexts: ['гостя', 'гостей', 'гостей'],
    RenderPosition: {
      AFTERBEGIN: 'afterbegin',
      BEFOREEND: 'beforeend',
    },
    KeyСode: {
      ESK: 27,
      ENTER: 13,
    },
  };

  window.Constant = Constant;
})();
