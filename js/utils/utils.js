'use strict';
(function () {
  var Constant = window.Constant;
  var LEFT_MOUSE_BUTTON = 0;

  var Utils = {
    render: render,
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
      case Constant.RenderPosition.AFTERBEGIN:
        $container.prepend($element);
        break;
      case Constant.RenderPosition.BEFOREEND:
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

  /**
   *
   * @param {Object} evt Событие клика мышки
   */

  function isLeftMouseButtonPressed(evt) {
    return evt.button === LEFT_MOUSE_BUTTON;
  }

  window.Utils = Utils;
})();
