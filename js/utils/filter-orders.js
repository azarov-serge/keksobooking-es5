'use strict';
(function () {
  // Import
  var FILTER_ALL = window.MapFilters.FILTER_ALL;
  // ----- * -----

  var filterPrice = {
    low: 10000,
    hight: 50000,
  };

  var simpleFilters = ['type', 'rooms', 'guests'];

  /**
   * @param {{offer: {type: String, rooms: Number, guests: Number}}} order
   * @param {String} type
   * @param {Number | String} value
   */

  function isFilteringSimpleType(order, type, value) {
    return (
      value === FILTER_ALL
        ? true
        : String(value) === String(order.offer[type])
    );
  }

  /**
   * @param {{offer: {price: Number}}} order
   * @param {Number} value
   * @return {Boolean}
   */

  function isFilteringPrice(order, value) {
    switch (value) {
      case 'low':
        return order.offer.price < filterPrice.low;
      case 'middle':
        return order.offer.price >= filterPrice.low && order.offer.price < filterPrice.hight;
      case 'high':
        return order.offer.price >= filterPrice.hight;
      default:
        return true;
    }
  }


  /**
   * @param {{offer: {features: String[]}}} order
   * @param {String[]} features
   * @return {Booean}
   */

  function isFilteringFeatures(order, features) {
    return features.every(function (feature) {
      return order.offer.features.indexOf(feature) !== -1;
    });
  }

  /**
   * @param {{offer: {type: String, rooms: Number, guests: Number, price: Number}}} order
   * @param {{type: String, rooms: String, guests: String, price: String}} filters
   * @param {String[]} features
   * @return {Boolean}
   */

  function isFilteringOrder(order, filters, features) {
    var isFiltering = true;
    for (var index = 0; index < simpleFilters.length; index++) {
      var filter = simpleFilters[index];
      isFiltering = isFiltering && isFilteringSimpleType(order, filter, filters[filter]);

      if (!isFiltering) {
        return false;
      }
    }

    isFiltering = isFiltering && isFilteringPrice(order, filters[filter]);

    if (!isFiltering) {
      return false;
    }

    isFiltering = isFiltering && isFilteringFeatures(order, features);

    if (!isFiltering) {
      return false;
    }

    return true;
  }

  /**
   * @param {({offer: {type: String, rooms: Number, guests: Number, price: Number}})[]} order
   * @param {{type: String, rooms: String, guests: String, price: String}} filters
   * @param {String[]} features
   * @return {Boolean}
   */

  function filterOrders(orders, filters, features) {
    return orders.filter(function (order) {
      return isFilteringOrder(order, filters, features);
    });
  }


  window.filterOrders = filterOrders;
})();
