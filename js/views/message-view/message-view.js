'use strict';
(function () {
  var AbsctractView = window.AbsctractView;

  var isEscPressed = window.EventsUtils.isEscPressed;

  var messageType = {
    success: 'success',
    error: 'error',
  };

  function MessageView(args) {
    AbsctractView.call(this);
    this._type = messageType[args.type] || messageType.success;
    this._message = args.message || '';
    this._buttonCaption = args.buttonCaption;
    this._className = {
      container: this._type,
      message: this._type + '__message',
      button: this._type + '__button',
    };
    this._onButtonClick = args.onButtonClick || function () {};
    this._onClose = args.onClose || function () {};

    this._handleMessageClick = this._handleMessageClick.bind(this);
    this._handleDocumentKeyDown = this._handleDocumentKeyDown.bind(this);
    this._handleButtonClick = this._handleButtonClick.bind(this);

    this._setInnerHandlers();
  }

  MessageView.prototype = Object.create(AbsctractView.prototype);
  MessageView.prototype.constructor = MessageView;

  MessageView.prototype._getTemplate = function () {
    var button = this._buttonCaption ? (
      '<button class="' + this._className.button + '">' +
      this._buttonCaption +
      '</button>'
    ) :
      '';

    return (
      '<div class="' + this._className.container + '">' +
        '<p class="' + this._className.message + '">' +
          this._message +
        '</p>' +
        button +
      '</div>'
    );
  };

  MessageView.prototype._closeMessage = function () {
    document.removeEventListener('keydown', this._documentKeyDownHandler);

    this._onClose();
    this.getElement().remove();
    this.remove();
  };

  MessageView.prototype._setInnerHandlers = function () {
    var element = this.getElement();

    element.addEventListener('click', this._handleMessageClick);
    document.addEventListener('keydown', this._handleDocumentKeyDown);

    if (this._buttonCaption) {
      element.querySelector('.' + this._className.button).addEventListener('click', this._handleButtonClick);
    }
  };

  MessageView.prototype._handleDocumentKeyDown = function (evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this._closeMessage();
    }
  };

  MessageView.prototype._handleMessageClick = function (evt) {
    if (!evt.target.classList.contains(this._className.message)) {
      evt.preventDefault();
      this._closeMessage();
    }
  };

  MessageView.prototype._handleButtonClick = function () {
    this._onButtonClick();
    this._closeMessage();
  };

  window.MessageView = MessageView;
})();
