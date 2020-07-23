'use strict';
(function () {
  var SuccessComponent = window.SuccessComponent;
  var ErrorComponent = window.ErrorComponent;
  var Constant = window.Constant;
  // var util = window.util;

  var STATUS_OK = 200;
  var END_POINT = 'https://javascript.pages.academy/keksobooking';
  // Конфигруация загруски для XMLHttpRequest
  var configLoad = {
    responseType: 'json',
    method: 'GET',
    url: END_POINT + '/data',
    timeout: 10000,
    body: '',
  };
  // Конфигруация отправки для XMLHttpRequest
  var configUpLoad = {
    responseType: 'json',
    method: 'POST',
    url: END_POINT,
    timeout: 10000,
    body: '',
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
    this._request(configLoad, this._successLoadHandler, this._errorHandler.bind(this));
  };

  /**
   * @description Загружает данные объявления на сервер
   * @param {Object} $form Элемент form
   */

  API.prototype.upload = function ($form) {
    configUpLoad.body = new FormData($form);
    this._request(configUpLoad, this._successUploadHandler.bind(this), this._errorHandler.bind(this));
  };

  /**
   *
   * @param {Object} ConfigXHR Файл с конфигурациями
   * @param {function} successHandler Callback в случае успеха
   * @param {function} errorHandler Callback в случае ошибки
   * @param {*} data Данные
   */

  API.prototype._request = function (configXHR, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    var responseType = configXHR.responseType;
    var method = configXHR.method;
    var url = configXHR.url;
    var timeout = configXHR.timeout;
    var body = configXHR.body;

    xhr.responseType = responseType;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        successHandler(xhr.response);
      } else {
        errorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler();
    });

    xhr.addEventListener('timeout', function () {
      errorHandler();
    });

    xhr.timeout = timeout;
    xhr.open(method, url);
    xhr.send(body);
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
