'use strict';
(function () {
  var AbsctractView = window.AbsctractView;

  var createCoords = window.CoordsUtils.createCoords;
  var setCoords = window.CoordsUtils.setCoords;
  var isEnterPressed = window.EventsUtils.isEnterPressed;
  var isLeftMouseButtonPressed = window.EventsUtils.isLeftMouseButtonPressed;

  function MainPinView() {
    AbsctractView.call(this);
    this._coordsMainPin = createCoords();
    this._coordsEvt = createCoords();
    this._coordsShift = createCoords();

    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._handleMouseUp = this._handleMouseUp.bind(this);
  }

  MainPinView.prototype = Object.create(AbsctractView.prototype);
  MainPinView.prototype.constructor = MainPinView;

  MainPinView.prototype._getTemplate = function () {
    return (
      '<button class="map__pin map__pin--main" style="left: 570px; top: 375px;">' +
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

  MainPinView.prototype.setKeyDownHandler = function (handler) {
    this._callback.mainPinKeyDown = handler;
    this.getElement().addEventListener('keydown', this._handleKeyDown);
  };

  MainPinView.prototype.setMouseDownHandler = function (handler) {
    this._callback.mainPinMouseDown = handler;
    this.getElement().addEventListener('mousedown', this._handleMouseDown);
  };

  MainPinView.prototype.setMouseMoveHandler = function (handler) {
    this._callback.mainPinMouseMove = handler;
  };

  MainPinView.prototype._handleKeyDown = function (evt) {
    if (isEnterPressed(evt)) {
      evt.preventDefault();

      this._callback.mainPinKeyDown(evt);
    }
  };

  MainPinView.prototype._handleMouseDown = function (evt) {
    if (!isLeftMouseButtonPressed(evt)) {
      return;
    }

    evt.preventDefault();

    this._coordsEvt.x = evt.clientX;
    this._coordsEvt.y = evt.clientY;

    this._callback.mainPinMouseDown(this._coordsEvt);

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

    this._callback.mainPinMouseMove(this._coordsMainPin);
  };

  MainPinView.prototype._handleMouseUp = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
  };

  window.MainPinView = MainPinView;
})();
