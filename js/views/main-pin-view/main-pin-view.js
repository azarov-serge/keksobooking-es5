'use strict';
(function () {
  // Import views
  var AbsctractView = window.AbsctractView;

  // Import utils
  var createCoords = window.coordsUtils.createCoords;
  var setCoords = window.coordsUtils.setCoords;
  var convertToCoords = window.coordsUtils.convertToCoords;
  var isEnterPressed = window.eventsUtils.isEnterPressed;
  var isLeftMouseButtonPressed = window.eventsUtils.isLeftMouseButtonPressed;
  // ----- * -----

  var DEFAULT_WIDTH = 65;
  var DEFAULT_HEIGHT = 65;

  var defaultCoords = {
    x: 570,
    y: 375,
  };

  function MainPinView(args) {
    AbsctractView.call(this);
    this._coordsMainPin = createCoords();
    this._coordsEvt = createCoords();
    this._coordsShift = createCoords();
    this._callback.onMouseMove = args.onMouseMove;

    this.reset = this.reset.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.getDefaultCoords = this.getDefaultCoords.bind(this);

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);

    this._addInnerHandlers(args);
  }

  MainPinView.prototype = Object.create(AbsctractView.prototype);
  MainPinView.prototype.constructor = MainPinView;

  MainPinView.prototype.reset = function () {
    var element = this.getElement();
    element.style.left = defaultCoords.x + 'px';
    element.style.top = defaultCoords.y + 'px';
  };

  MainPinView.prototype.getCoords = function () {
    var x = this.getElement().style.left;
    var y = this.getElement().style.top;

    return convertToCoords(x, y);
  };

  MainPinView.prototype.getDefaultCoords = function () {
    var element = this.getElement();
    var x = element.style.left;
    var y = element.style.top;
    var coords = convertToCoords(x, y);

    return {
      x: Math.floor(coords.x + DEFAULT_WIDTH / 2),
      y: Math.floor(coords.y + DEFAULT_HEIGHT / 2),
    };
  };

  MainPinView.prototype._getTemplate = function () {
    return (
      '<button ' +
        'class="map__pin map__pin--main" ' +
        'style="left: ' + defaultCoords.x + 'px; ' +
        'top: ' + defaultCoords.y + 'px;"' +
      '>' +
        '<img src="img/muffin-red.svg" width="40" height="44" draggable="false" alt="Метка объявления" />' +
        '<svg viewBox="0 0 70 70" width="156" height="156" aria-label="Метка для поиска жилья">' +
          '<defs>' +
            '<path d="M35,35m-23,0a23,23 0 1,1 46,0a23,23 0 1,1 -46,0" id="tophalf"></path>' +
          '</defs>' +
          '<ellipse cx="35" cy="35" rx="35" ry="35" fill="rgba(255, 86, 53, 0.7)"></ellipse>' +
          '<text>' +
            '<textPath xlink:href="#tophalf" startOffset="0">' +
              'Поставь меня куда-нибудь' +
            '</textPath>' +
          '</text>' +
        '</svg>' +
      '</button>'
    );
  };

  MainPinView.prototype._addInnerHandlers = function (args) {
    if (args && args.onKeyDown) {
      this._callback.onKeyDown = args.onKeyDown;
      this.getElement().addEventListener('keydown', this._handleKeyDown);
    }

    if (args && args.onMouseDown) {
      this._callback.onMouseDown = args.onMouseDown;
      this.getElement().addEventListener('mousedown', this._handleMouseDown);
    }
  };

  MainPinView.prototype._handleKeyDown = function (evt) {
    if (isEnterPressed(evt)) {
      evt.preventDefault();

      this._callback.onKeyDown(evt);
    }
  };

  MainPinView.prototype._handleMouseDown = function (evt) {
    if (!isLeftMouseButtonPressed(evt)) {
      return;
    }

    evt.preventDefault();

    this._coordsEvt.x = evt.clientX;
    this._coordsEvt.y = evt.clientY;

    this._callback.onMouseDown(this._coordsEvt);

    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseup', this._handleMouseUp);
  };

  MainPinView.prototype._handleMouseMove = function (evt) {
    evt.preventDefault();
    this._coordsShift.x = this._coordsEvt.x - evt.clientX;
    this._coordsShift.y = this._coordsEvt.y - evt.clientY;

    this._coordsEvt.x = evt.clientX;
    this._coordsEvt.y = evt.clientY;

    this._coordsMainPin = setCoords(
        this.getElement().offsetLeft - this._coordsShift.x,
        this.getElement().offsetTop - this._coordsShift.y
    );

    this.getElement().style.left = this._coordsMainPin.x + 'px';
    this.getElement().style.top = this._coordsMainPin.y + 'px';

    this._callback.onMouseMove(this._coordsMainPin);
  };

  MainPinView.prototype._handleMouseUp = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
  };

  window.MainPinView = MainPinView;
})();
