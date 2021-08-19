'use strict';
(function () {
  var Observer = window.Observer;

  function OrdersModel() {
    Observer.call(this);
    this._orders = [];
    this._error = '';
  }

  OrdersModel.prototype = Object.create(Observer.prototype);
  OrdersModel.prototype.constructor = OrdersModel;

  OrdersModel.prototype.setOrders = function (actionType, orders) {
    this._orders = orders;
    this.notify(actionType);
  };

  OrdersModel.prototype.getOrders = function () {
    return this._orders;
  };

  OrdersModel.prototype.setOrder = function (actionType) {
    this.notify(actionType);
  };

  OrdersModel.prototype.setError = function (actionType, error) {
    this._error = error;
    this.notify(actionType, error);
  };

  OrdersModel.prototype.getError = function () {
    return this._error;
  };

  window.OrdersModel = OrdersModel;
})();
