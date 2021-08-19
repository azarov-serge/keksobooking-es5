'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;

  // Import utils
  var getSimpleOptionsTemplate = window.templateUtils.getSimpleOptionsTemplate;
  // ----- * -----

  function NewOrderRoomsView(args) {
    AbsctractView.call(this);

    this._options = args.options;
    this._roomsElement = null;
    this._DEFAULT_VALUE = args.options[0].value;
    this._callback.onChange = args.onChange;

    this.reset = this.reset.bind(this);
    this._handleChage = this._handleChage.bind(this);

    this._addInnerHandlers();
  }

  NewOrderRoomsView.prototype = Object.create(AbsctractView.prototype);
  NewOrderRoomsView.prototype.constructor = NewOrderRoomsView;

  NewOrderRoomsView.prototype.reset = function () {
    this._getRoomsElement().value = this._DEFAULT_VALUE;
    this._callback.onChange(this._DEFAULT_VALUE);
  };

  NewOrderRoomsView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form__element" >' +
        '<label class="ad-form__label" for="room_number">Количество комнат</label>' +
        '<select id="room_number" name="rooms">' +
          getSimpleOptionsTemplate(this._options) +
        '</select>' +
      '</fieldset>'
    );
  };

  NewOrderRoomsView.prototype._getRoomsElement = function () {
    if (!this._roomsElement) {
      this._roomsElement = this.getElement().querySelector('#room_number');
    }

    return this._roomsElement;
  };

  NewOrderRoomsView.prototype._addInnerHandlers = function () {
    if (this._callback.onChange) {
      this._getRoomsElement().addEventListener('input', this._handleChage);
    }
  };

  NewOrderRoomsView.prototype._removeInnerHandlers = function () {
    if (this._callback.onChange) {
      this._getRoomsElement().removeEventListener('input', this._handleChage);
    }
  };

  NewOrderRoomsView.prototype._handleChage = function (evt) {
    evt.preventDefault();

    if (this._callback.onChange) {
      this._callback.onChange(evt.target.value);
    }
  };

  window.NewOrderRoomsView = NewOrderRoomsView;
})();
