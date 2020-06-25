'use strict';
(function () {
  var Util = window.Util;

  function OrdersModel() {
    this._orders = null;
  }

  OrdersModel.prototype.setOrders = function (orders) {
    this._orders = orders.map(this._createOrder);
  };

  OrdersModel.prototype.getOrders = function () {
    return this._orders;
  };

  OrdersModel.prototype.getOrderByID = function (id) {
    return Util.getByID(this._orders, parseInt(id, 10));
  };

  OrdersModel.prototype._createOrder = function (order, id) {
    var orderModel = Object.assign({}, order);
    orderModel.id = id;
    return orderModel;
  };

  window.OrdersModel = OrdersModel;
})();
