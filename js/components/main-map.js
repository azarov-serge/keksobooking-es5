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
    this._$pins = null;
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

  MainMap.prototype.renderPins = function ($pins) {
    this._$pins = $pins;
    window.utils.render(this.getPinsContainer(), this._$pins, this.getMainPin());
  };

  MainMap.prototype.renderCard = function (card) {
    if (this._card) {
      this._card.removeElement();
    }
    this._card = card;
    this._card.render(this.getElement(), this._card.getElement(), this.getFiltersContainer());
  };

  window.MainMap = MainMap;
})();
