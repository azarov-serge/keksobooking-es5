'use strict';
(function () {
  var $mainMap = document.querySelector('.map');
  var $mainPin = $mainMap.querySelector('.map__pin--main');
  var $pinsContainer = $mainMap.querySelector('.map__pins');
  var $filtersContainer = $mainMap.querySelector('.map__filters-container');
  var $adForm = document.querySelector('.ad-form');
  var $adAddress = $adForm.querySelector('#address');
  var $adRooms = $adForm.querySelector('#room_number');
  var $adGuests = $adForm.querySelector('#capacity');

  var orders = window.generateOrders(window.Constant.ORDER_COUNT);
  var $pins = orders.map(function (order) {
    return window.createPin(order);
  });
  var $card = window.createCard(orders[0]);


  function toggleAdForm() {
    $adForm.classList.toggle('ad-form--disabled');
    window.utils.toggleFieldSets($adForm);
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

  $adRooms.value = window.Constant.DEFAULT_ROOMS;
  $adGuests.value = window.utils.setGuests($adRooms.value);
  window.utils.disabledGuestsValues($adGuests, $adRooms.value);

  window.utils.toggleFieldSets($adForm);
  setAddress($mainPin.style.left, $mainPin.style.top);
  $mainMap.classList.contains('map--faded');

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


  $adRooms.addEventListener('change', function () {
    window.utils.validateRooms($adRooms, $adGuests);
  });

  $adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (evt.target.checkValidity()) {
      evt.target.action = window.Constant.Url.SEND;
    }
  });
})();
