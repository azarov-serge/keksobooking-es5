'use strict';
(function () {
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
  // Карточка объявления
  var card = new window.Card(orders[0]);
  // Координаты главного пина
  var mainPinCoords = window.coords.create();

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
      mainMap.renderCard(card);
    }
  }

  // Активируем контроллер формы объявлений
  adFormController.activate();
  // Удалит слово "px" у координат
  window.coords.convertToCoords(mainPinCoords, $mainPin.style.left, $mainPin.style.top);
  // Установка адреса на форму объявлений
  adForm.setAddress(mainPinCoords);

  $mainPin.addEventListener('mousedown', function (evt) {
    if (window.utils.isLeftMouseButtonPressed(evt)) {
      activateMap();
    }
  });

  $mainPin.addEventListener('keydown', function (evt) {
    if (window.keyboard.isEnterPressed(evt)) {
      activateMap();
    }
  });
})();
