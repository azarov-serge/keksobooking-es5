'use strict';
(function () {
  var Constant = {
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
    ConfigUpLoad: {
      RESPONSE_TYPE: 'json',
      METHOD: 'POST',
      URL: 'https://javascript.pages.academy/keksobooking',
      TIMEOUT: 500,
    },
  };

  window.Constant = Constant;
})();
