'use strict';
(function () {
  var LEFT_MOUSE_BUTTON = 0;

  var utils = {
    render: render,
    getRandomInt: getRandomInt,
    getRandomArrValue: getRandomArrValue,
    getRandomArr: getRandomArr,
    getWordEnd: getWordEnd,
    isLeftMouseButtonPressed: isLeftMouseButtonPressed,
  };

  /**
   * @description Вставляет <$element> в <$container> на место <place>
   * @param {Object} $container DOM-элемент, куда необходимо вставить component
   * @param {Object} $element DOM-элемент, который необходимо вставить в container
   * @param {string} place Место вставки в container значение afterbegin || beforeend
   */

  function renderElement($container, $element, place) {
    switch (place) {
      case window.Constant.RenderPosition.AFTERBEGIN:
        $container.prepend($element);
        break;
      case window.Constant.RenderPosition.BEFOREEND:
        $container.append($element);
        break;
    }
  }

  /**
   * @description Создает фрагмент с объектами для вставки
   * @param {Object[]} $elements Массив DOM-элементов
   * @return {Object}
   */

  function createRenderFragment($elements) {
    var $fragment = document.createDocumentFragment();

    $elements.forEach(function ($element) {
      $fragment.appendChild($element);
    });

    return $fragment;
  }

  /**
    * @description Вставляет <$element> в <$container> на место <place>
    * @param {Object} $container DOM-элемент, куда необходимо вставить component
    * @param {Object} $element DOM-элемент, который необходимо вставить в container
    * @param {string} place Место вставки в container значение afterbegin || beforeend || DOMElement. По умолчанию beforeend
    */

  function render($container, $element, place) {
    var $renderElement = Array.isArray($element) ? createRenderFragment($element) : $element;

    if (place instanceof Object) {
      $container.insertBefore($renderElement, place);
    } else {
      renderElement($container, $renderElement, place);
    }
  }

  /**
   * @param {number} min
   * @param {number} max
   * @return {number}
   */

  function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  }

  /**
   * @param {Object[]} arr Массив значений
   * @return {*} Рандомное значение
   */

  function getRandomArrValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * @param {Object[]} arr Исходный массив значений
   * @param {number} length Длинна массива, который нужно получить
   * @return {Object[]} Рандомный массив
   */

  function getRandomArr(arr, length) {
    length = length || arr.length;
    var randomArr = arr.slice();
    randomArr.sort(function () {
      return Math.random() - 0.5;
    });
    return randomArr.slice(0, length);
  }

  /**
    * @description Возвращет склоненние слова или окончание для числа
    * @param {number} number Число, дя которого нужно найти склонение слов или окончания числа
    * @param {Object[]} txt Массив склонений слов или окончания числа
    * @return {String} Слово или окончание для числа
    */

  function getWordEnd(number, txt) {
    var cases = [2, 0, 1, 1, 1, 2];
    var index = 0;
    if (number % 100 > 4 && number % 100 < 20) {
      index = 2;
    } else {
      index = cases[(number % 10 < 5) ? number % 10 : 5];
    }
    return txt[index];
  }

  function isLeftMouseButtonPressed(evt) {
    return evt.button === LEFT_MOUSE_BUTTON;
  }

  window.utils = utils;
})();
