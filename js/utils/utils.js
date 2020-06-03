'use strict';
// TODO Удалить функции, которые не используются createElement, getNextIndex
(function () {
  var ESK_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var Utils = {
    RenderPosition: {
      AFTERBEGIN: 'afterbegin',
      BEFOREEND: 'beforeend',
    },

    /**
    * @description Проверяет нажата клавиша Esc
    * @param {number} evt Код клавиши
    * @return Возвращает true || false
    */

    isEscKeycode: function (evt) {
      return evt.keyCode === ESK_KEYCODE;
    },

    /**
    * @param {number} evt Код клавиши
    * @return Возвращает true || false
    */

    isEnterKeycode: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },

    /**
     * @param {Object} elem Элемент массива <arr>
     * @param {Object[]} arr Массив с элементами
     * @param {number} startIndex С какого индекса начинать, в случае если конец массива или элемент не найден
     * @return {number} Следующий индекс для перехода
     */

    getNextIndex: function (elem, arr, startIndex) {
      startIndex = startIndex ? startIndex : 0;
      var index = arr.indexOf(elem);
      switch (index) {
        case -1:
          return startIndex;
        case arr.length - 1:
          return 0;
        default:
          return index++;
      }
    },

    /**
    * @description Возвращет склоненние слова или окончание для числа
    * @param {number} number Число, дя которого нужно найти склонение слов или окончания числа
    * @param {Object[]} txt Массив склонений слов или окончания числа
    * @return {String} Слово или окончание для числа
    */

    getEndWord: function (number, txt) {
      var cases = [2, 0, 1, 1, 1, 2];
      var index = 0;
      if (number % 100 > 4 && number % 100 < 20) {
        index = 2;
      } else {
        index = cases[(number % 10 < 5) ? number % 10 : 5];
      }
      return txt[index];
    },

    /**
     * @description Вставляет <component> в <container> на место <place>
     * @param {Object} container DOM-элемент, куда необходимо вставить component
     * @param {Object} component DOM-элемент, который необходимо вставить в container
     * @param {string} place Место вставки в container значение afterbegin || beforeend
     */

    render: function (container, component, place) {
      switch (place) {
        case window.Utils.RenderPosition.AFTERBEGIN:
          container.prepend(component);
          break;
        case window.Utils.RenderPosition.BEFOREEND:
          container.append(component);
          break;
      }
    },

    /**
     * Удаляет компонент component
     * @param {Object} component
     */
    remove: function (component) {
      component.getElement().remove();
      component.removeElement();
    },

    /**
    * @description Создает DOM элемент из шаблонной строки
    * @param {string} template Шаблон элемента в виде строки
    * @return {Object} Возвращает DOM элемент
    */

    createElement: function (template) {
      var newElement = document.createElement('div');
      newElement.innerHTML = template;

      return newElement.firstChild;
    },
  };

  window.Utils = Utils;
})();
