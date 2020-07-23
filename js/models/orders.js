'use strict';
(function () {
  var util = window.util;

  var ORDERS_COUNT = 5;

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

    var orders = [];
    var index = 0;

    while (index < this._getFilteredOrders().length && orders.length < ORDERS_COUNT) {
      var order = this._getFilteredOrders()[index];

      if (this._isFiltering(order)) {
        orders.push(order);
      }
      index++;
    }

    return orders;
  };

  OrdersModel.prototype.isOrdersExist = function () {
    return this._orders.length;
  };

  OrdersModel.prototype._getFilteredOrders = function () {
    function filterOrders(order) {
      return order.offer;
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

  OrdersModel.prototype._isFiltering = function (order) {
    return (
      this._isSimpleFiltering(order, 'housing-type')
      &&
      this._isSimpleFiltering(order, 'housing-rooms')
      &&
      this._isSimpleFiltering(order, 'housing-guests')
      &&
      this._isFilteringPrice(order)
      &&
      this._isFilteringFeatures(order)
    );
  };

  /**
   * @description Делает простую проверку для фильтрации
   * @param {Object} order Объявление
   * @param {string} type Название фильра
   * @return Возвращает true || false (проходит условие фильтра)
   */

  OrdersModel.prototype._isSimpleFiltering = function (order, type) {
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
    return this.filters['housing-features'].value.every(function (feature) {
      return order.offer.features.indexOf(feature) !== -1;
    });
  };

  window.OrdersModel = OrdersModel;
})();
