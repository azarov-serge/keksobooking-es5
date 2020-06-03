'use strict';
(function () {
  var ORDER_COUNT = 8;

  var mainMap = new window.MainMap();
  var pins = new window.Pins();

  var orders = window.generateOrders(ORDER_COUNT);
  var listPins = [];

  /**
   * @description Отрисовывает список пинов на карте, если карта была неактивной
   */

  function renderMainMap() {
    mainMap.activate();
    pins.getElement();
    orders.forEach(function (order) {
      var pin = new window.Pin(order);
      pin.getElement();
      listPins.push(pin);
      window.Utils.render(pins.getElement(), pin.getElement(), window.Utils.RenderPosition.BEFOREEND);
    });
  }

  mainMap.getElement();
  window.inf.mapInf = document.querySelector('.map').getBoundingClientRect();
  renderMainMap();
})();
