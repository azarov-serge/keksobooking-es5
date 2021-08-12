'use strict';
(function () {
  function Observer() {
    this._observers = [];
  }

  Observer.prototype.subscribe = function (handler) {
    this._observers.push(handler);
  };

  Observer.prototype.unsubscribe = function (handler) {
    this._observers = this._observers.filter(function (existedHandler) {
      return existedHandler !== handler;
    });
  };

  Observer.prototype.notify = function (actionType, payload) {
    this._observers = this._observers.forEach(function (handler) {
      handler(actionType, payload);
    });
  };

  window.Observer = Observer;
})();
