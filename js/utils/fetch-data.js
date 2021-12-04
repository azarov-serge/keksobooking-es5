'use strict';
(function () {
  var Future = window.Future;
  var defaultParams = {
    method: 'GET',
    timeout: 500,
    body: '',
    responseType: '',
  };

  function FetchApi(url, params) {
    this._url = url;
    this._params = params;
    this._defaultErrorMessage = 'Request error';
    this._xhr = new XMLHttpRequest();
    this._resolve = null;
    this._reject = null;

    this.request = this.request.bind(this);
    this._setHeaders = this._setHeaders.bind(this);
    this._handleLoad = this._handleLoad.bind(this);
    this._handleError = this._handleError.bind(this);
    this._handleTimeout = this._handleTimeout.bind(this);
  }

  FetchApi.prototype.request = function (resolve, reject) {
    this._resolve = resolve;
    this._reject = reject;

    try {
      var params = this._params || defaultParams;
      var method = params.method || defaultParams.method;
      var timeout = params.timeout || defaultParams.timeout;
      var body = params.body || defaultParams.body;

      this._xhr.responseType = params.responseType || defaultParams.responseType;

      this._xhr.addEventListener('load', this._handleLoad);

      this._xhr.addEventListener('error', this._handleError);

      this._xhr.addEventListener('timeout', this._handleTimeout);

      this._xhr.timeout = timeout;
      this._xhr.open(method, this._url);

      if (this._params.headers) {
        this._setHeaders(this._params.headers);
      }

      this._xhr.send(body);
    } catch (error) {
      this._handleError(error);
    }
  };

  FetchApi.prototype._setHeaders = function (headers) {
    var keys = Object.keys(headers);
    for (var index = 0; index < keys.length; index++) {
      var key = keys[index];
      this._xhr.setRequestHeader(key, headers[key]);
    }
  };

  FetchApi.prototype._handleLoad = function () {
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
      this._resolve(result);
    } else {
      this._handleError(this._xhr.status + ': ' + this._xhr.statusText);
    }
  };

  FetchApi.prototype._handleError = function (error) {
    this._reject(new Error(error || this._defaultErrorMessage));
  };

  FetchApi.prototype._handleTimeout = function () {
    this._handleError(new Error('Request timeout'));
  };

  /**
   * @description Fetch data
   * @param {String} url
   * @param {{method: string, timeout: number, body: object, responseType: string, headers: object}} params
   * @returns
   */

  function fetchData(url, params) {
    var fetchApi = new FetchApi(url, params);

    return new Future(function (resolve, reject) {
      fetchApi.request(resolve, reject);
    });
  }

  window.fetchData = fetchData;
})();
