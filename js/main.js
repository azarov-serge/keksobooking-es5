'use strict';
(function () {
  var $mainMap = document.querySelector('.map');
  var $pinsContainer = $mainMap.querySelector('.map__pins');

  var orders = window.generateOrders(window.Constants.ORDER_COUNT);
  var $pins = orders.map(function (order) {
    return window.createPin(order);
  });
  var $card = window.createCard(orders[0]);

  $mainMap.classList.toggle('map--faded');
  window.utils.render($pinsContainer, $pins);
  window.utils.render($mainMap, $card);
})();
