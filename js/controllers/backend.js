'use strict';
(function () {
  var SuccessComponent = window.SuccessComponent;
  var ErrorComponent = window.ErrorComponent;
  var Constant = window.Constant;
  var Util = window.Util;

  function BackendController() {
    this._successLoadHandler = null;
    this._successUpload = null;
    this._successComponent = null;
    this._errorComponent = null;
  }

  BackendController.prototype.setSuccessLoadHandler = function (successLoadHandler) {
    this._successLoadHandler = successLoadHandler;
  };

  BackendController.prototype.setSuccessUploadHandler = function (successUpload) {
    this._successUpload = successUpload;
  };

  /**
   * @description Загружает список объявлений с сервера или обрабатывает ошибку
   */

  BackendController.prototype.load = function () {
    // Получить список объявлений с сервера
    Util.interactWithServer(Constant.ConfigLoad, this._successLoadHandler, this._errorHandler.bind(this));
  };

  /**
   * @description Загружает данные объявления на сервер
   * @param {Object} $form Элемент form
   */

  BackendController.prototype.upload = function ($form) {
    Util.interactWithServer(Constant.ConfigUpLoad, this._successUploadHandler.bind(this), this._errorHandler.bind(this), new FormData($form));
  };

  /**
   * @description Callback в случае ошибки получения списка объявлений с сервера
   */

  BackendController.prototype._errorHandler = function () {
    this._errorComponent = new ErrorComponent();
    this._errorComponent.addErrorListeners();
    this._errorComponent.render(document.querySelector('main'), Constant.RenderPosition.BEFOREEND);
  };

  BackendController.prototype._successUploadHandler = function () {
    this._successComponent = new SuccessComponent();
    this._successComponent.addSuccessListeners(this._successUpload);
    this._successComponent.render(document.querySelector('main'), Constant.RenderPosition.BEFOREEND);
  };

  window.BackendController = BackendController;
})();
