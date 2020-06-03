'use strict';
(function () {
  var ORDER_COUNT = 8;

  var mainMap = new window.MainMap();
  var pins = new window.Pins();
  var mainPin = new window.MainPin();

  var orders = window.generateOrders(ORDER_COUNT);
  var listPins = [];
  var evtCoord = {
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
    pinX: 0,
    pinY: 0,
  };

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

  function onMainPinMouseMove(evt) {
    evt.preventDefault();

    evtCoord.shiftX = evtCoord.x - evt.clientX;
    evtCoord.shiftY = evtCoord.y - evt.clientY;
    evtCoord.x = evt.clientX;
    evtCoord.y = evt.clientY;
    evtCoord.pinX = window.Utils.setCoordX(mainPin.getElement().offsetLeft - evtCoord.shiftX);
    evtCoord.pinY = window.Utils.setCoordY(mainPin.getElement().offsetTop - evtCoord.shiftY);

    mainPin.getElement().style.left = evtCoord.pinX + 'px';
    mainPin.getElement().style.top = evtCoord.pinY + 'px';
  }

  function onMainPinMouseUp(evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);
  }

  function onMainPinMousedown() {
    mainPin.getElement().addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      if (!mainMap._isActivate) {
        renderMainMap();
      }

      evtCoord.x = evt.clientX;
      evtCoord.y = evt.clientY;

      document.addEventListener('mousemove', onMainPinMouseMove);
      document.addEventListener('mouseup', onMainPinMouseUp);
    });
  }

  mainMap.getElement();
  window.inf.mapInf = document.querySelector('.map').getBoundingClientRect();
  mainPin.onMousedown = onMainPinMousedown;
  mainPin.onMousedown();
})();
