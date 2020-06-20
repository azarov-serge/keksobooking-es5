'use strict';
(function () {
  var Constant = {
    ORDERS_COUNT: 5,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 82,
    MAP_MIN_X: 0,
    MAP_MAX_X: 1200,
    MAP_MIN_Y: 130,
    MAP_MAX_Y: 630,
    Url: {
      LOAD: ' https://javascript.pages.academy/keksobooking/data',
      UPLOAD: 'https://javascript.pages.academy/keksobooking',
    },
    bookingType: {
      palace: {
        title: 'Дворец',
        minPrice: 10000,
      },
      flat: {
        title: 'Квартира',
        minPrice: 1000,
      },
      house: {
        title: 'Дом',
        minPrice: 5000,
      },
      bungalo: {
        title: 'Бунгало',
        minPrice: 0,
      },
    },
    roomTexts: ['комната', 'комнаты', 'комнат'],
    guestTexts: ['гостя', 'гостей', 'гостей'],
    RenderPosition: {
      AFTERBEGIN: 'afterbegin',
      BEFOREEND: 'beforeend',
    },
    ConfigLoad: {
      RESPONSE_TYPE: 'json',
      METHOD: 'GET',
      URL: 'https://javascript.pages.academy/keksobooking/data',
      TIMEOUT: 500,
    },
  };

  window.Constant = Constant;
})();
