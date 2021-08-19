'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function NewOrderPriceView() {
    AbsctractView.call(this);

    this._priceElement = null;

    this.setMinPrice = this.setMinPrice.bind(this);
  }

  NewOrderPriceView.prototype = Object.create(AbsctractView.prototype);
  NewOrderPriceView.prototype.constructor = NewOrderPriceView;

  NewOrderPriceView.prototype.reset = function () {
    var priceElement = this._getPriceElement();
    priceElement.required = false;
    priceElement.width = priceElement.width;
    priceElement.required = true;
    priceElement.value = '';
  };

  NewOrderPriceView.prototype.setMinPrice = function (price) {
    this._getPriceElement().placeholder = price;
    this._getPriceElement().min = price;
  };

  NewOrderPriceView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form__element" >' +
        '<label class="ad-form__label" for="price">Цена за ночь, руб.</label>' +
        '<input ' +
          'id="price" ' +
          'name="price" ' +
          'type="number" ' +
          'placeholder="0" ' +
          'max="1000000" ' +
          'min="0" ' +
          'required' +
        '/>' +
      '</fieldset>'
    );
  };

  NewOrderPriceView.prototype._getPriceElement = function () {
    if (!this._priceElement) {
      this._priceElement = this.getElement().querySelector('#price');
    }

    return this._priceElement;
  };

  window.NewOrderPriceView = NewOrderPriceView;
})();
