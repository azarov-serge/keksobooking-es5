'use strict';
(function () {
  var Utils = window.Utils;
  // Массив объявлений
  var orders = window.generateOrders(window.Constant.ORDER_COUNT);
  // Модель с объявлениями
  var ordersModel = new window.OrdersModel();
  // Карта страницы
  var mainMapComponent = new window.MainMapComponent();
  // Контейнер с пинами
  var mapPinsComponent = new window.MapPinsComponent(mainMapComponent.getElement());
  // Форма для размещения объявления
  var adFormConponent = new window.AdFormComponent();
  // Контроллер контейнера с пинами
  var mapPinsController = new window.MapPinsController(mapPinsComponent, ordersModel);
  // Контроллер формы
  var adFormController = new window.AdFormController(adFormConponent);
  // Координаты главного пина
  var mainPinCoords = mapPinsController.getMainPinDefaultCoords();

  /**
   * @description Активация карты
   */
  function activateMap() {
    mainPinCoords = mapPinsController.getMainPinCoords();
    adFormController.setAddress(mainPinCoords);
    if (!mainMapComponent.isActivate()) {
      mainMapComponent.toggleState();
      adFormConponent.toggleState();
      adFormController.startValidate();
      ordersModel.setOrders(orders);
    }
  }

  // Активируем контроллер формы объявлений
  adFormController.activate();
  // Установка адреса на форму объявлений
  adFormController.setAddress(mainPinCoords);

  mapPinsComponent.getMainPin().addEventListener('mousedown', function (evt) {
    if (Utils.isLeftMouseButtonPressed(evt)) {
      activateMap();
    }
  });

  mapPinsComponent.getMainPin().addEventListener('keydown', function (evt) {
    if (window.keyboard.isEnterPressed(evt)) {
      activateMap();
    }
  });
})();
