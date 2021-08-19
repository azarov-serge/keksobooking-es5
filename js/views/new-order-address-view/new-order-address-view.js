'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function NewOrderAddressView() {
    AbsctractView.call(this);

    this._addressElement = null;
  }

  NewOrderAddressView.prototype = Object.create(AbsctractView.prototype);
  NewOrderAddressView.prototype.constructor = NewOrderAddressView;

  NewOrderAddressView.prototype.setAddress = function (address) {
    this._getAddressElement().value = address;
  };

  NewOrderAddressView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form__element ad-form__element--wide" disabled>' +
        '<label class="ad-form__label" for="address">Адрес</label>' +
        '<input id="address" name="address" type="text" readonly />' +
      '</fieldset>'
    );
  };

  NewOrderAddressView.prototype._getAddressElement = function () {
    if (!this._addressElement) {
      this._addressElement = this.getElement().querySelector('#address');
    }

    return this._addressElement;
  };

  window.NewOrderAddressView = NewOrderAddressView;
})();
