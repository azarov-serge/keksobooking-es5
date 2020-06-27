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
  };

  window.Constant = Constant;
})();
