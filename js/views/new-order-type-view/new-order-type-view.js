'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;

  // Import utils
  var getSimpleOptionsTemplate = window.templateUtils.getSimpleOptionsTemplate;
  // ----- * -----

  function NewOrderTypeView(args) {
    AbsctractView.call(this);

    this._options = args.options;
    this._typeElement = null;
    this._DEFAULT_VALUE = args.options[1].value;
    this._callback.onChange = args.onChange;

    this.reset = this.reset.bind(this);
    this._handleChage = this._handleChage.bind(this);

    this._addInnerHandlers();
  }

  NewOrderTypeView.prototype = Object.create(AbsctractView.prototype);
  NewOrderTypeView.prototype.constructor = NewOrderTypeView;

  NewOrderTypeView.prototype.reset = function () {
    this._getTypeElement().value = this._DEFAULT_VALUE;
    this._callback.onChange(this._DEFAULT_VALUE);
  };

  NewOrderTypeView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form__element" >' +
        '<label class="ad-form__label" for="type">Тип жилья</label>' +
        '<select id="type" name="type">' +
          getSimpleOptionsTemplate(this._options) +
        '</select>' +
      '</fieldset>'
    );
  };

  NewOrderTypeView.prototype._getTypeElement = function () {
    if (!this._typeElement) {
      this._typeElement = this.getElement().querySelector('#type');
    }

    return this._typeElement;
  };

  NewOrderTypeView.prototype._addInnerHandlers = function () {
    if (this._callback.onChange) {
      this._getTypeElement().addEventListener('change', this._handleChage);
    }
  };

  NewOrderTypeView.prototype._removeInnerHandlers = function () {
    if (this._callback.onChange) {
      this._getTypeElement().removeEventListener('change', this._handleChage);
    }
  };

  NewOrderTypeView.prototype._handleChage = function (evt) {
    evt.preventDefault();

    this._callback.onChange(evt.target.value);
  };

  window.NewOrderTypeView = NewOrderTypeView;
})();
