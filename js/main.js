'use strict';
(function () {
  var Coords = window.Coords;
  var Utils = window.Utils;
  // Карта страницы
  var mainMap = new window.MainMap();
  // Главный пин (mainPin)
  var $mainPin = mainMap.getMainPin();
  // Форма для размещения объявления
  var adForm = new window.AdForm();
  // Контроллер формы
  var adFormController = new window.AdFormController(adForm);
  // Массив объявлений
  var orders = window.generateOrders(window.Constant.ORDER_COUNT);
  // Координаты главного пина. Удалит слово "px" у координат
  var mainPinCoords = Coords.convertToCoords($mainPin.style.left, $mainPin.style.top);

  function activatePinController() {
    mainMap.getPins().forEach(function (pin) {
      var pinController = new window.PinController(pin, mainMap);
      pinController.activate();
    });
  }

  /**
   * @description Активация карты
   */
  function activateMap() {
    adForm.setAddress(mainPinCoords);
    if (!mainMap.isActivate()) {
      mainMap.toggleState();
      adForm.toggleState();
      adFormController.startValidate();
      mainMap.renderPins(orders);
      activatePinController();
    }
  }

  // Активируем контроллер формы объявлений
  adFormController.activate();
  // Установка адреса на форму объявлений
  adForm.setAddress(mainPinCoords);

  $mainPin.addEventListener('mousedown', function (evt) {
    if (Utils.isLeftMouseButtonPressed(evt)) {
      activateMap();
    }
  });

  $mainPin.addEventListener('keydown', function (evt) {
    if (window.keyboard.isEnterPressed(evt)) {
      activateMap();
    }
  });
})();
