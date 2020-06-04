'use strict';
(function () {
  var ORDER_COUNT = 8;

  var mainMap = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var orders = window.generateOrders(ORDER_COUNT);
  var pins = orders.map(function (order) {
    return window.createPin(order);
  });

  /**
   * @description Отрисовывает список пинов на карте
   */

  function activateMainMap() {
    mainMap.classList.remove('map--faded');
    window.Utils.render(pinsContainer, fragment, window.Utils.RenderPosition.BEFOREEND);
  }

  pins.forEach(function (pin) {
    fragment.appendChild(pin);
  });

  activateMainMap();
})();
