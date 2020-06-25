'use strict';
(function () {
  var Util = window.Util;

  var FILTER_ALL = 'any';

  function OrdersModel() {
    this._orders = [];
    this._listFilters = [];
    this._filterAll = {
      value: 'any',
      rank: 1
    };
    this.filters = {
      'housing-type': {
        type: 'type',
        value: null,
      },
      'housing-rooms': {
        type: 'rooms',
        value: null,
      },
      'housing-guests': {
        type: 'guests',
        value: null,
      },
      'housing-price': {
        type: 'price',
        value: null,
      },
      'housing-features': {
        type: 'features',
        value: null,
      },
    };
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

  OrdersModel.prototype.getOrdersByFilters = function () {
    if (!this._orders.length) {
      throw new Error('Orders are not exist');
    }

    var isFiltering = this._isFiltering.bind(this);

    return this._orders.filter((function (order) {
      return (
        isFiltering(order, 'housing-type')
        &&
        isFiltering(order, 'housing-rooms')
        &&
        isFiltering(order, 'housing-guests')
      );
    }));
  };

  OrdersModel.prototype.isOrdersExist = function () {
    return Boolean(this._orders.length);
  };

  OrdersModel.prototype._createOrder = function (order, id) {
    var orderModel = Object.assign({}, order);
    orderModel.id = id;
    return orderModel;
  };

  OrdersModel.prototype._isFiltering = function (order, type) {
    return (
      this.filters[type].value === FILTER_ALL
        ? true
        : String(this.filters[type].value) === String(order.offer[this.filters[type].type])
    );
  };

  window.OrdersModel = OrdersModel;
})();
