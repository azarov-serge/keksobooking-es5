'use strict';
(function () {
  var $mainMap = document.querySelector('.map');
  var $mainPin = $mainMap.querySelector('.map__pin--main');
  var $pinsContainer = $mainMap.querySelector('.map__pins');
  var $filtersContainer = $mainMap.querySelector('.map__filters-container');

  var orders = window.generateOrders(window.Constants.ORDER_COUNT);
  var $pins = orders.map(function (order) {
    return window.createPin(order);
  });
  var $card = window.createCard(orders[0]);

  $mainMap.classList.toggle('map--faded');
  window.utils.render($pinsContainer, $pins, $mainPin);
  window.utils.render($mainMap, $card, $filtersContainer);
})();
