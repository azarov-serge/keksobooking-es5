'use strict';
(function () {
  var MainMapClass = {
    MAIN_MAP: '.map',
    TOGGLE_CLASS: 'map--faded',
    MAIN_PIN: '.map__pin--main',
    PINS_CONTAINER: '.map__pins',
    FILTERS_CONTAINER: '.map__filters-container',
  };

  function MainMap() {
    window.AbsctractElement.call(this);
    this._SELECTOR = MainMapClass.MAIN_MAP;
    this._TOGGLE_CLASS = MainMapClass.TOGGLE_CLASS;
    this._$mainPin = null;
    this._$pinsContainer = null;
    this._$filtersContainer = null;
    this._pins = null;
    this._card = null;
  }

  MainMap.prototype = Object.create(window.AbsctractElement.prototype);
  MainMap.prototype.constructor = MainMap;

  MainMap.prototype.getMainPin = function () {
    return this.getCustomElement(this._$mainPin, MainMapClass.MAIN_PIN, this.getElement());
  };

  MainMap.prototype.getPinsContainer = function () {
    return this.getCustomElement(this._$pinsContainer, MainMapClass.PINS_CONTAINER, this.getElement());
  };

  MainMap.prototype.getFiltersContainer = function () {
    return this.getCustomElement(this._$filtersContainer, MainMapClass.FILTERS_CONTAINER, this.getElement());
  };

  MainMap.prototype.renderPins = function (order) {
    if (this._pins !== null) {
      this.removePins();
    }

    var $pins = [];
    this._pins = new Array(order.length).fill('').map(function (pin, index) {
      pin = new window.Pin(order[index]);
      $pins.push(pin.getElement());
      return pin;
    });

    this.render(this.getPinsContainer(), $pins, this.getMainPin());
  };

  MainMap.prototype.removePins = function () {
    this._pins.forEach(function (pin) {
      pin.remove();
    });
    this._pins = null;
  };

  MainMap.prototype.renderCard = function (card) {
    if (this._card) {
      this._card.remove();
    }
    this._card = card;
    this._card.render(this.getElement(), this._card.getElement(), this.getFiltersContainer());
  };

  window.MainMap = MainMap;
})();
