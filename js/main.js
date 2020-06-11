'use strict';
(function () {
  // Карта страницы
  var $mainMap = document.querySelector('.map');
  // Главный пин (mainPin)
  var $mainPin = $mainMap.querySelector('.map__pin--main');
  // Контейнер пинов (объявлений)
  var $pinsContainer = $mainMap.querySelector('.map__pins');
  // Контейнер фильтров объявлений на карте
  var $filtersContainer = $mainMap.querySelector('.map__filters-container');
  // Массив объявлений
  var orders = window.generateOrders(window.Constant.ORDER_COUNT);
  // Массив пинов (DOM-элементы на основе массива объявлений)
  var $pins = orders.map(function (order) {
    var pin = new window.Pin(order);
    return pin.create();
  });
  // Карточка объявления
  var card = new window.Card(orders[0]);

  /**
   * @description Активация карты
   */
  function activateMap() {
    window.adForm.setAddress($mainPin.style.left, $mainPin.style.top);
    if ($mainMap.classList.contains('map--faded')) {
      $mainMap.classList.toggle('map--faded');
      window.adForm.toggleAdForm();
      window.utils.render($pinsContainer, $pins, $mainPin);
      card.create();
      card.render($mainMap, $filtersContainer);
    }
  }
  // Установка адреса на форму объявлений
  window.adForm.setAddress($mainPin.style.left, $mainPin.style.top);

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
