'use strict';
(function () {
  var KeyСode = {
    ESC: 27,
    ENTER: 13,
  };

  var keyboard = {
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed,
  };

  /**
   * @description Проверяет нажата клавиша Esc
   * @param {number} evt Код клавиши
   * @return Возвращает true || false
   */

  function isEscPressed(evt) {
    return evt.keyCode === KeyСode.ESC;
  }

  /**
   * @description Проверяет нажата клавиша Enter
   * @param {number} evt Код клавиши
   * @return Возвращает true || false
   */

  function isEnterPressed(evt) {
    return evt.keyCode === KeyСode.ENTER;
  }

  window.keyboard = keyboard;
})();
