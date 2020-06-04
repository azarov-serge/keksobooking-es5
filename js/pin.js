'use strict';
(function () {
  function createPin(data) {
    var coords = Object.assign({}, data.location);
    coords = window.Utils.convertAddressToCoords(coords);
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = template.cloneNode(true);
    pin.style.left = coords.x + 'px';
    pin.style.top = coords.y + 'px';
    pin.querySelector('img').alt = data.offer.title;
    pin.querySelector('img').src = data.author.avatar;
    pin.tabindex = '0';
    return pin;
  }

  window.createPin = createPin;
})();
