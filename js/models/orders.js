'use strict';
(function () {
  var util = window.util;

  var FILTER_ALL = 'any';
  var filterPrice = {
    low: 10000,
    hight: 50000,
  };


  function OrdersModel() {
    this._orders = [];
    this._filteredOrders = [];
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
        value: null,
      },
      'housing-features': {
        value: null,
      },
    };
  }

  OrdersModel.prototype.setOrders = function (orders) {
    this._orders = orders.map(this._createOrder);
  };

  OrdersModel.prototype.getOrderByID = function (id) {
    return util.getByID(this._orders, parseInt(id, 10));
  };

  OrdersModel.prototype.getOrdersByFilters = function () {
    if (!this._orders.length) {
      throw new Error('Orders are not exist');
    }

    var isFiltering = this._isFiltering.bind(this);
    var isFilteringPrice = this._isFilteringPrice.bind(this);
    var isFilteringFeatures = this._isFilteringFeatures.bind(this);

    return this._getFilteredOrders().filter((function (order) {
      return (
        isFiltering(order, 'housing-type')
        &&
        isFiltering(order, 'housing-rooms')
        &&
        isFiltering(order, 'housing-guests')
        &&
        isFilteringPrice(order)
        &&
        isFilteringFeatures(order)
      );
    }));
  };

  OrdersModel.prototype.isOrdersExist = function () {
    return Boolean(this._orders.length);
  };

  OrdersModel.prototype._getFilteredOrders = function () {
    function filterOrders(order) {
      return Boolean(order.offer);
    }
    if (!this._filteredOrders.length) {
      this._filteredOrders = this._orders.filter(filterOrders);
    }

    return this._filteredOrders;
  };

  OrdersModel.prototype._createOrder = function (order, id) {
    var orderModel = Object.assign({}, order);
    orderModel.id = id;
    return orderModel;
  };

  /**
   * @description Делает простую проверку для фильтрации
   * @param {Object} order Объявление
   * @param {string} type Название фильра
   * @return Возвращает true || false (проходит условие фильтра)
   */

  OrdersModel.prototype._isFiltering = function (order, type) {
    return (
      this.filters[type].value === FILTER_ALL
        ? true
        : String(this.filters[type].value) === String(order.offer[this.filters[type].type])
    );
  };

  /**
   * @description Делает проверку для фильтрации цены
   * @param {Object} order Объявление
   * @return Возвращает true || false (проходит условие фильтра)
   */

  OrdersModel.prototype._isFilteringPrice = function (order) {
    switch (this.filters['housing-price'].value) {
      case 'low':
        return order.offer.price < filterPrice.low;
      case 'middle':
        return order.offer.price >= filterPrice.low && order.offer.price < filterPrice.hight;
      case 'high':
        return order.offer.price >= filterPrice.hight;
      default:
        return true;
    }
  };


  /**
   * @description Делает проверку для фильтрации удобств
   * @param {Object} order Объявление
   * @return Возвращает true || false (проходит условие фильтра)
   */

  OrdersModel.prototype._isFilteringFeatures = function (order) {
    var isFiltering = true;
    this.filters['housing-features'].value.forEach(function (filter) {
      if (order.offer.features.indexOf(filter) === -1) {
        isFiltering = false;
        return;
      }

    });

    return isFiltering;
  };

  window.OrdersModel = OrdersModel;
})();
