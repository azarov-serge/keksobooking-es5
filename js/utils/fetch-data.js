'use strict';
(function () {
  var FetchData = function (url, params) {
    this._url = url;
    this._params = params;
    this._xhr = new XMLHttpRequest();
    this._successHandlers = [];
    this._errorHandler = null;

    this._setHeaders = this._setHeaders.bind(this);
    this._isFunction = this._isFunction.bind(this);

    this._request = this._request.bind(this);
    this._handleLoad = this._handleLoad.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleTimeout = this._handleTimeout.bind(this);
  };

  FetchData.prototype.then = function (handler) {
    this._isFunction(handler);

    this._successHandlers.push(handler);

    if (this._successHandlers.length === 1) {
      this._request();
    }

    return this;
  };

  FetchData.prototype.catch = function (handler) {
    this._isFunction(handler);

    this._errorHandler = handler;
    return this;
  };

  FetchData.prototype._isFunction = function (handler) {
    if (typeof handler !== 'function') {
      throw new Error('Handler is not a function. You set type ' + typeof handler);
    }
  };

  FetchData.prototype._request = function () {
    try {
      var method = this._params.method;
      var timeout = this._params.timeout || 10000;
      var body = this._params.body || '';

      if (this._params.headers) {
        this._setHeaders(this._params.headers);
      }

      this._xhr.responseType = this._params.responseType || '';

      this._xhr.addEventListener('load', this._handleLoad);

      this._xhr.addEventListener('error', this._handleError);

      this._xhr.addEventListener('timeout', this._handleTimeout);

      this._xhr.timeout = timeout;
      this._xhr.open(method, this._url);
      this._xhr.send(body);
    } catch (error) {
      this._handleError(error);
    }

  };

  FetchData.prototype._setHeaders = function (headers) {
    var keys = Object.keys(headers);
    for (var index = 0; index < keys.length; index++) {
      var key = keys[index];
      this._xhr.setRequestHeader(key, headers[key]);
    }
  };

  FetchData.prototype._handleLoad = function () {
    if (this._xhr.status === 200) {
      var response = this._xhr.response;

      var result = {
        status: this._xhr.status,
        statusText: this._xhr.status.statusText,
        response: response,
        json: function () {
          return JSON.parse(response);
        },
      };
      for (var index = 0; index < this._successHandlers.length; index++) {
        result = this._successHandlers[index](result);
      }

      this._successHandlers = [];
      this._errorHandler = null;
    } else {
      this._handleError(this._xhr.status + ': ' + this._xhr.statusText);
    }
  };

  FetchData.prototype._handleError = function (error) {
    if (typeof handler === 'function') {
      this._errorHandler(new Error(error || 'Reqest error'));
    }

    // eslint-disable-next-line no-console
    console.warn(error);
  };

  FetchData.prototype._handleTimeout = function () {
    this._handleError(new Error('Request timeout'));
  };

  function fetchData(url, params) {
    return new FetchData(url, params);
  }

  window.fetchData = fetchData;
})();
