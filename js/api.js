'use strict';
(function () {
  var SuccessComponent = window.SuccessComponent;
  var ErrorComponent = window.ErrorComponent;
  var Constant = window.Constant;
  var util = window.util;
  // Конфигруация загруски для XMLHttpRequest
  var ConfigLoad = {
    RESPONSE_TYPE: 'json',
    METHOD: 'GET',
    URL: 'https://javascript.pages.academy/keksobooking/data',
    TIMEOUT: 10000,
  };
  // Конфигруация отправки для XMLHttpRequest
  var ConfigUpLoad = {
    RESPONSE_TYPE: 'json',
    METHOD: 'POST',
    URL: 'https://javascript.pages.academy/keksobooking',
    TIMEOUT: 30000,
  };
  // Контейнер куда размещается сообщение
  var $container = document.querySelector('main');

  function API() {
    this._successLoadHandler = null;
    this._successUpload = null;
    this._successComponent = null;
    this._errorComponent = null;
  }

  API.prototype.setSuccessLoadHandler = function (successLoadHandler) {
    this._successLoadHandler = successLoadHandler;
  };

  API.prototype.setSuccessUploadHandler = function (successUpload) {
    this._successUpload = successUpload;
  };

  /**
   * @description Загружает список объявлений с сервера или обрабатывает ошибку
   */

  API.prototype.load = function () {
    // Получить список объявлений с сервера
    util.requestServer(ConfigLoad, this._successLoadHandler, this._errorHandler.bind(this));
  };

  /**
   * @description Загружает данные объявления на сервер
   * @param {Object} $form Элемент form
   */

  API.prototype.upload = function ($form) {
    util.requestServer(ConfigUpLoad, this._successUploadHandler.bind(this), this._errorHandler.bind(this), new FormData($form));
  };

  /**
   * @description Callback в случае ошибки получения списка объявлений с сервера
   */

  API.prototype._errorHandler = function () {
    this._errorComponent = new ErrorComponent();
    this._errorComponent.addErrorListeners();
    this._errorComponent.render($container, Constant.RenderPosition.BEFOREEND);
  };

  API.prototype._successUploadHandler = function () {
    this._successUpload();
    this._successComponent = new SuccessComponent();
    this._successComponent.addSuccessListeners();
    this._successComponent.render($container, Constant.RenderPosition.BEFOREEND);
  };

  window.API = API;
})();
