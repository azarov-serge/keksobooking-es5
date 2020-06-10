'use strict';
(function () {
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
    return evt.keyCode === window.Constant.KeyCode.ESC;
  }

  /**
   * @description Проверяет нажата клавиша Enter
   * @param {number} evt Код клавиши
   * @return Возвращает true || false
   */

  function isEnterPressed(evt) {
    return evt.keyCode === window.Constant.KeyСode.ENTER;
  }

  window.keyboard = keyboard;
})();
