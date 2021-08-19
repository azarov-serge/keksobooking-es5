'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function NewOrderFormView(args) {
    AbsctractView.call(this);

    this._toggleClass = args.toggleClass;
    this._callback.onSubmit = args.onSubmit;
    this._callback.onReset = args.onReset;

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleReset = this._handleReset.bind(this);

    this._addInnerHandlers();
  }

  NewOrderFormView.prototype = Object.create(AbsctractView.prototype);
  NewOrderFormView.prototype.constructor = NewOrderFormView;

  NewOrderFormView.prototype._getTemplate = function () {
    return (
      '<form ' +
        'class="ad-form" ' +
        'method="post" ' +
        'enctype="multipart/form-data" ' +
        'autocomplete="off"' +
      '>' +
      '</form>'
    );
  };

  NewOrderFormView.prototype._addInnerHandlers = function () {
    if (this._callback.onSubmit) {
      this.getElement().addEventListener('submit', this._handleSubmit);
    }

    if (this._callback.onReset) {
      this.getElement().addEventListener('reset', this._handleReset);
    }
  };

  NewOrderFormView.prototype._removeInnerHandlers = function () {
    if (this._callback.onSubmit) {
      this._getTitleElement().removeEventListener('submit', this._handleSubmit);
    }

    if (this._callback.onReset) {
      this._getTitleElement().removeEventListener('reset', this._handleReset);
    }
  };

  NewOrderFormView.prototype._handleSubmit = function (evt) {
    evt.preventDefault();
    if (this._callback.onSubmit) {
      this._callback.onSubmit(evt);
    }
  };

  NewOrderFormView.prototype._handleReset = function (evt) {
    evt.preventDefault();
    if (this._callback.onReset) {
      this._callback.onReset(evt.target.value);
    }
  };

  window.NewOrderFormView = NewOrderFormView;
})();
