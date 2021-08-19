'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function NewOrderButtonsView() {
    AbsctractView.call(this);
  }

  NewOrderButtonsView.prototype = Object.create(AbsctractView.prototype);
  NewOrderButtonsView.prototype.constructor = NewOrderButtonsView;

  NewOrderButtonsView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form__element ad-form__element--submit">' +
        '<button class="ad-form__submit" type="submit">Опубликовать</button>' +
        'или <button class="ad-form__reset" type="reset">очистить</button>' +
      '</fieldset>'
    );
  };

  window.NewOrderButtonsView = NewOrderButtonsView;
})();
