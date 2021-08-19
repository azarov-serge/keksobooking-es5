'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;

  // Import utils
  var getSimpleOptionsTemplate = window.templateUtils.getSimpleOptionsTemplate;
  // ----- * -----

  var DEFAULT_VALUE = '12:00';

  function NewOrderTimeView(args) {
    AbsctractView.call(this);

    this._timeInOptions = args.timeInOptions;
    this._timeOutOptions = args.timeOutOptions;
    this._timeInElement = null;
    this._timeOutElement = null;

    this.reset = this.reset.bind(this);
    this.setTimeInValue = this.setTimeInValue.bind(this);
    this.setTimeOutValue = this.setTimeOutValue.bind(this);
    this._handleChage = this._handleChage.bind(this);

    this._addInnerHandlers();
  }

  NewOrderTimeView.prototype = Object.create(AbsctractView.prototype);
  NewOrderTimeView.prototype.constructor = NewOrderTimeView;

  NewOrderTimeView.prototype.reset = function () {
    this._getTimeInElement().value = DEFAULT_VALUE;
    this._getTimeOutElement().value = DEFAULT_VALUE;
  };

  NewOrderTimeView.prototype.setTimeInValue = function (value) {
    this._getTimeInElement().value = value;
  };

  NewOrderTimeView.prototype.setTimeOutValue = function (value) {
    this._getTimeOutElement().value = value;
  };

  NewOrderTimeView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form__element ad-form__element--time" >' +
        '<label class="ad-form__label" for="timein">Время заезда и выезда</label>' +
        '<select id="timein" name="timein" title="Time to go in">' +
          getSimpleOptionsTemplate(this._timeInOptions) +
        '</select>' +
        '<select id="timeout" name="timeout" title="Time to go out">' +
          getSimpleOptionsTemplate(this._timeOutOptions) +
        '</select>' +
      '</fieldset>'
    );
  };

  NewOrderTimeView.prototype._getTimeInElement = function () {
    if (!this._timeInElement) {
      this._timeInElement = this.getElement().querySelector('#timein');
    }

    return this._timeInElement;
  };

  NewOrderTimeView.prototype._getTimeOutElement = function () {
    if (!this._timeOutElement) {
      this._timeOutElement = this.getElement().querySelector('#timeout');
    }

    return this._timeOutElement;
  };

  NewOrderTimeView.prototype._addInnerHandlers = function () {
    this._getTimeInElement().addEventListener('change', this._handleChage);
    this._getTimeOutElement().addEventListener('change', this._handleChage);
  };

  NewOrderTimeView.prototype._removeInnerHandlers = function () {
    this._getTimeInElement().removeEventListener('change', this._handleChage);
    this._getTimeOutElement().removeEventListener('change', this._handleChage);
  };

  NewOrderTimeView.prototype._handleChage = function (evt) {
    evt.preventDefault();

    if (evt.target.id === 'timein') {
      this.setTimeOutValue(evt.target.value);
    } else {
      this.setTimeInValue(evt.target.value);
    }

    if (this._callback.onChange) {
      this._callback.onChange();
    }
  };

  window.NewOrderTimeView = NewOrderTimeView;
})();
