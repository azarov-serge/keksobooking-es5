'use strict';
(function () {
  var mainMap = document.querySelector('.map');
  var pinsContainer = mainMap.querySelector('.map__pins');

  var orders = window.generateOrders(window.constants.ORDER_COUNT);
  var pins = orders.map(function (order) {
    return window.createPin(order);
  });

  mainMap.classList.toggle('map--faded');
  window.Utils.render(pinsContainer, pins);
})();
