'use strict';
(function () {
  var FutureStatus = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
  };

  function Future(callback) {
    this._status = FutureStatus.PENDING;
    this._resolveCallbacks = [];
    this._rejectCalback = null;
    this._data = undefined;

    this.then = this.then.bind(this);
    this.catch = this.catch.bind(this);

    this._resolve = this._resolve.bind(this);
    this._reject = this._reject.bind(this);

    return callback(this._resolve, this._reject);
  }

  Future.prototype.then = function (resolve) {
    this._resolveCallbacks.push(resolve);

    return this;
  };

  Future.prototype.catch = function (reject) {
    this._rejectCalback = reject;

    return this;
  };

  Future.prototype._resolve = function (data) {
    if (this._status === FutureStatus.PENDING) {
      this._status = FutureStatus.FULFILLED;
      this._data = data;

      for (var i = 0; i < this._resolveCallbacks.length; i++) {
        this._data = this._resolveCallbacks[i](this._data);
      }
    }
  };

  Future.prototype._reject = function (error) {
    if (this._status === FutureStatus.PENDING && this._rejectCalback) {
      this._status = FutureStatus.REJECTED;
      this._rejectCalback(error);
    } else {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  window.Future = Future;
})();
