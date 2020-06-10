'use strict';
(function () {
  var $mainMap = document.querySelector('.map');
  var $mainPin = $mainMap.querySelector('.map__pin--main');
  var $pinsContainer = $mainMap.querySelector('.map__pins');
  var $filtersContainer = $mainMap.querySelector('.map__filters-container');
  var $adForm = document.querySelector('.ad-form');
  var $adFieldsets = $adForm.children;
  var $adAddress = $adForm.querySelector('#address');


  var orders = window.generateOrders(window.Constant.ORDER_COUNT);
  var $pins = orders.map(function (order) {
    return window.createPin(order);
  });
  var $card = window.createCard(orders[0]);

  function toggleFieldSets() {
    Array.prototype.slice.call($adFieldsets).forEach(function ($adFieldset) {
      $adFieldset.disabled = !$adFieldset.disabled;
    });
  }

  function toggleAdForm() {
    $adForm.classList.toggle('ad-form--disabled');
    toggleFieldSets();
  }


  function actiateMap() {
    setAddress($mainPin.style.left, $mainPin.style.top);
    if ($mainMap.classList.contains('map--faded')) {
      $mainMap.classList.toggle('map--faded');
      toggleAdForm();
      window.utils.render($pinsContainer, $pins, $mainPin);
      window.utils.render($mainMap, $card, $filtersContainer);
    }
  }

  function getMainPinCoord(coord) {
    return parseInt(String(coord).replace('px', ''), 10);
  }

  function setAddress(x, y) {
    var coords = window.coords.create();
    coords = {
      x: getMainPinCoord(x),
      y: getMainPinCoord(y)
    };
    window.coords.convertToLocation(coords);
    $adAddress.value = coords.x + ', ' + coords.y;
  }

  toggleFieldSets();
  setAddress($mainPin.style.left, $mainPin.style.top);

  $mainPin.addEventListener('mousedown', function (evt) {
    if (window.utils.isLeftMouseButtonPress(evt)) {
      actiateMap();
    }
  });

  $mainPin.addEventListener('keydown', function (evt) {
    if (window.keyboard.isEnterPressed(evt)) {
      actiateMap();
    }
  });
})();
