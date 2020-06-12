'use strict';
(function () {
  // Карта страницы
  var mainMap = new window.MainMap();
  // Главный пин (mainPin)
  var $mainPin = mainMap.getMainPin();
  // Форма для размещения объявления
  var adForm = new window.AdForm();
  var adFormController = new window.AdFormController(adForm);
  adFormController.activate();
  // Массив объявлений
  var orders = window.generateOrders(window.Constant.ORDER_COUNT);

  // Массив пинов (DOM-элементы на основе массива объявлений)
  var $pins = orders.map(function (order) {
    var pin = new window.Pin(order);
    return pin.getElement();
  });
  // Карточка объявления
  var card = new window.Card(orders[0]);

  /**
   * @description Активация карты
   */
  function activateMap() {
    adForm.setAddress({x: $mainPin.style.left, y: $mainPin.style.top});
    if (!mainMap.isActivate) {
      mainMap.toggleState();
      adForm.toggleState();
      adForm.toggleFieldsets();
      mainMap.renderPins($pins);
      mainMap.renderCard(card);
    }
  }

  // Деактивация fieldsets
  if (adForm.isActivate !== adForm.isActivateFieldsets) {
    adForm.toggleFieldsets();
  }

  // Установка адреса на форму объявлений
  adForm.setAddress({x: $mainPin.style.left, y: $mainPin.style.top});

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
