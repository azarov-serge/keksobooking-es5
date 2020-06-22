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
      TIMEOUT: 10000,
    },
    ConfigUpLoad: {
      RESPONSE_TYPE: 'json',
      METHOD: 'POST',
      URL: 'https://javascript.pages.academy/keksobooking',
      TIMEOUT: 30000,
    },
    ValidateValue: {
      TITLE_MIN_LENGTH: 30,
      TITLE_MAX_LENGTH: 100,
      NOT_GUESTS: 0,
      MAX_ROOMS_COUNT: 100,
      MAX_PRICE: 1000000,
      IMAGES_AVATAR: 'image/*',
      IMAGES_AD: 'image/png, image/jpeg',
    },
  };

  window.Constant = Constant;
})();
