'use strict';
(function () {
  var fetchData = window.fetchData;

  var END_POINT = 'https://javascript.pages.academy/keksobooking';

  var Method = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
  };

  function getOrders() {
    var params = {
      method: Method.GET,
      responseType: 'json',
    };

    return fetchData(END_POINT + '/data', params);
  }

  function addOrder(point) {
    var params = {
      method: Method.POST,
      body: point,
      responseType: 'json',
    };

    return fetchData(END_POINT, params);
  }

  window.Api = {
    getOrders: getOrders,
    addOrder: addOrder,
  };
})();
