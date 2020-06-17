'use strict';
(function () {
  function OrdersModel() {
    this._orders = null;
  }

  OrdersModel.prototype.setOrders = function (orders) {
    this._orders = orders;
  };

  OrdersModel.prototype.getOrders = function () {
    return this._orders;
  };

  OrdersModel.prototype.getOrderByIndex = function (index) {
    return this._orders[index];
  };

  window.OrdersModel = OrdersModel;
})();
