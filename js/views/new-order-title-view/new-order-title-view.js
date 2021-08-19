'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function NewOrderTitleView(args) {
    AbsctractView.call(this);

    this._titleElement = null;
    this._callback.onChange = args && args.onChange || null;

    this.reset = this.reset.bind(this);
    this._handleChage = this._handleChage.bind(this);

    this._addInnerHandlers();
  }

  NewOrderTitleView.prototype = Object.create(AbsctractView.prototype);
  NewOrderTitleView.prototype.constructor = NewOrderTitleView;

  NewOrderTitleView.prototype.reset = function () {
    var titleElement = this._getTitleElement();
    titleElement.required = false;
    titleElement.width = titleElement.width;
    titleElement.required = true;
    titleElement.value = '';
  };

  NewOrderTitleView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form__element ad-form__element--wide" >' +
          '<label class="ad-form__label" for="title">Заголовок объявления</label>' +
          '<input ' +
            'id="title" ' +
            'name="title" ' +
            'type="text" ' +
            'placeholder="Милая, уютная квартирка в центре Токио" ' +
            'minlength="30" ' +
            'maxlength="100" ' +
            'width="0" ' +
            'required ' +
          '/>' +
      '</fieldset>'
    );
  };

  NewOrderTitleView.prototype._getTitleElement = function () {
    if (!this._titleElement) {
      this._titleElement = this.getElement().querySelector('#title');
    }

    return this._titleElement;
  };

  NewOrderTitleView.prototype._addInnerHandlers = function () {
    if (this._callback.onChange) {
      this._getTitleElement().addEventListener('input', this._handleChage);
    }
  };

  NewOrderTitleView.prototype._removeInnerHandlers = function () {
    if (this._callback.onChange) {
      this._getTitleElement().removeEventListener('input', this._handleChage);
    }
  };

  NewOrderTitleView.prototype._handleChage = function (evt) {
    evt.preventDefault();

    if (this._callback.onChange) {
      this._callback.onChange(evt.target.value);
    }
  };

  window.NewOrderTitleView = NewOrderTitleView;
})();
