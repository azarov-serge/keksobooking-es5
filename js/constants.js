'use strict';
(function () {
  var Constant = {
    ORDERS_COUNT: 5,
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
