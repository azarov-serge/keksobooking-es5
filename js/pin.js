'use strict';
(function () {
  function createPin(data) {
    var coordsPin = Object.assign({}, data.location);
    window.coords.convertFromgitLocation(coordsPin);
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = template.cloneNode(true);
    pin.style.left = coordsPin.x + 'px';
    pin.style.top = coordsPin.y + 'px';
    pin.querySelector('img').alt = data.offer.title;
    pin.querySelector('img').src = data.author.avatar;
    pin.tabindex = '0';
    return pin;
  }

  window.createPin = createPin;
})();
