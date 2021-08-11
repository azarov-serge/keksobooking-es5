'use strict';
(function () {
  var AbsctractView = window.AbsctractView;

  function PromoView() {
    AbsctractView.call(this);
  }

  PromoView.prototype = Object.create(AbsctractView.prototype);
  PromoView.prototype.constructor = PromoView;

  PromoView.prototype._getTemplate = function () {
    return (
      '<div class="promo">' +
      '<h1 class="promo__title visually-hidden">Keksobooking. Кексы по соседству</h1>' +
      '<img src="img/keksobooking.svg" alt="Keksobooking. Кексы по соседству" width="215" height="45">' +
      '</div>'
    );
  };

  window.PromoView = PromoView;
})();
