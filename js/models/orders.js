'use strict';
(function () {
  var Util = window.Util;

  function OrdersModel() {
    this._orders = [];
    this._listFilters = [];
    this._filterAll = {
      value: 'any',
      rank: 1
    };
    this.filters = {
      'housing-type': {
        value: null,
        rank: 2,
      },
      'housing-price': {
        value: null,
        rank: 2,
      },
      'housing-rooms': {
        value: null,
        rank: 2,
      },
      'housing-guests': {
        value: null,
        rank: 2,
      },
      'housing-features': {
        value: null,
        rank: 2,
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
    var getRank = this._getRank.bind(this);

    return this._orders.slice().sort((function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = left.id - right.id;
      }

      return rankDiff;
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

  OrdersModel.prototype._willFilter = function (orderValue, filterValue) {
    return (
      (orderValue === filterValue)
      &&
      (filterValue !== this._FILTER_ALL)
    );
  };

  OrdersModel.prototype._getSimpleRank = function (rank, orderValue, filterName) {
    if (this.filters[filterName].value === this._filterAll.value) {
      return rank + this._filterAll.rank;
    }

    if (String(orderValue) === this.filters[filterName].value) {
      return rank + this.filters[filterName].rank;
    }

    return rank;
  };

  OrdersModel.prototype._getRank = function (order) {
    var rank = 0;
    // Получить ранг по типу
    rank = this._getSimpleRank(rank, order.offer.type, 'housing-type');
    // Получить ранг по количеству комнат
    rank = this._getSimpleRank(rank, order.offer.rooms, 'housing-rooms');
    // Получить ранг по количеству гостей
    rank = this._getSimpleRank(rank, order.offer.guests, 'housing-guests');
    order.rank = rank;

    return rank;
  };

  window.OrdersModel = OrdersModel;
})();
