'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function NewOrderDescriptionView() {
    AbsctractView.call(this);

    this._descriptionElement = null;

    this.reset = this.reset.bind(this);
  }

  NewOrderDescriptionView.prototype = Object.create(AbsctractView.prototype);
  NewOrderDescriptionView.prototype.constructor = NewOrderDescriptionView;

  NewOrderDescriptionView.prototype.reset = function () {
    this._getDescriptionElement().value = '';
  };

  NewOrderDescriptionView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form__element ad-form__element--wide" >' +
        '<label class="ad-form__label" for="description">' +
          'Описание (не обязательно)' +
        '</label>' +
        '<textarea ' +
          'id="description" ' +
          'name="description" ' +
          'placeholder="Здесь расскажите о том, какое ваше жилье замечательное и вообще"' +
        '>' +
        '</textarea>' +
      '</fieldset>'
    );
  };

  NewOrderDescriptionView.prototype._getDescriptionElement = function () {
    if (!this._descriptionElement) {
      this._descriptionElement = this.getElement().querySelector('#description');
    }

    return this._descriptionElement;
  };

  window.NewOrderDescriptionView = NewOrderDescriptionView;
})();
