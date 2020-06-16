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
    this._orders = null;
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

  MainMap.prototype.createPins = function (orders) {
    this._pins = new Array(orders.length).fill('').map(function (pin, index) {
      pin = new window.Pin(orders[index]);
      return pin;
    });
  };

  MainMap.prototype.renderPins = function (orders) {
    if (this._pins) {
      this.removePins();
    }

    var $pins = [];
    // Создаст массив пин компонентов
    this.createPins(orders);
    // Создаст массив пин элементов для рендеринга
    this._pins.forEach(function (pin) {
      $pins.push(pin.getElement());
    });

    this.render(this.getPinsContainer(), $pins, this.getMainPin());
  };

  MainMap.prototype.removePins = function () {
    this._pins.forEach(function (pin) {
      pin.remove();
    });
    this._pins = null;
  };

  MainMap.prototype.getPins = function () {
    return this._pins;
  };

  MainMap.prototype.renderCard = function (card) {
    this.removeCard();
    this._card = card;
    this._card.render(this.getElement(), this._card.getElement(), this.getFiltersContainer());
  };

  MainMap.prototype.removeCard = function () {
    if (this._card) {
      this._card.remove();
      this._card = null;
    }
  };

  window.MainMap = MainMap;
})();
