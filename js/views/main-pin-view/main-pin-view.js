'use strict';
(function () {
  var AbsctractView = window.AbsctractView;

  function MainPinView() {
    AbsctractView.call(this);

    this._handleMainPinClick = this._handleMainPinClick.bind(this);
  }

  MainPinView.prototype = Object.create(AbsctractView.prototype);
  MainPinView.prototype.constructor = MainPinView;

  MainPinView.prototype._getTemplate = function () {
    return (
      '<button class="map__pin map__pin--main" style="left: 570px; top: 375px;">' +
      '<img src="img/muffin-red.svg" width="40" height="44" draggable="false" alt="Метка объявления">' +
      '<svg viewBox="0 0 70 70" width="156" height="156" aria-label="Метка для поиска жилья">' +
      '<defs>' +
      '<path d="M35,35m-23,0a23,23 0 1,1 46,0a23,23 0 1,1 -46,0" id="tophalf"></path>' +
      '</defs>' +
      '<ellipse cx="35" cy="35" rx="35" ry="35" fill="rgba(255, 86, 53, 0.7)"></ellipse>' +
      '<text><textPath xlink:href="#tophalf" startOffset="0">Поставь меня куда-нибудь</textPath></text>' +
      '</svg>' +
      '</button>'
    );
  };

  MainPinView.prototype.setClickHandler = function (handler) {
    this._callback.mapPinClick = handler;
    this.getElement().addEventListener('click', this._handleMainPinClick);
  };

  MainPinView.prototype._handleMainPinClick = function (evt) {
    evt.preventDefault();
    this._callback.mapPinClick();
  };

  window.MainPinView = MainPinView;
})();
