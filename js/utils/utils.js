'use strict';
(function () {
  var Constant = window.Constant;
  var DEBOUNCE_INTERVAL = 500;

  // Код нажатия кнопки мыши
  var LEFT_MOUSE_BUTTON = 0;
  // Коды клавиш
  var KeyСode = {
    ESC: 27,
    ENTER: 13,
  };

  // Типы изображений
  var FILE_TYPES = ['gif', 'svg', 'jpg', 'jpeg', 'png'];

  var util = {
    render: render,
    getWordEnd: getWordEnd,
    isLeftMouseButtonPressed: isLeftMouseButtonPressed,
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed,
    loadImage: loadImage,
    getByID: getByID,
    debounce: debounce,
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
    * @param {Object[]} txt Массив склонений слов или окончания числа. Массив из 3 значений
    * @return {String} Слово или окончание для числа
    *
    * Слова с окончаниями для чисел:
    * Вариант1 (индекс 0): 1, 21, 31, 41, 51, 61, 71, 81, 91, 101, 121, 131, 141 и т.д.
    * Вариант2 (индекс 1): 2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44 ... 102, 103, 104, 122, 123, 124, 132 и т.д.
    * Вариант3 (индекс 2): 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 26, 27, 28, 29, 30, 35 и т.д.
    */

  function getWordEnd(number, txt) {
    var cases = [2, 0, 1, 1, 1, 2];
    var index = 0;
    // Если число от 5 до 19, выбираем последний Вариант3 (индекс 2)
    if ((number % 100 > 4) && (number % 100 < 20)) {
      index = 2;
    } else {
      // Если число заканчивается на 5 выбираем последний Вариант3 (индекс 2), иначе берем значение в зависимоти от кейса cases
      index = cases[(number % 10 < 5) ? number % 10 : 5];
    }
    return txt[index];
  }

  /**
   * @description Проверяет нажата главная кнопка мыши или нет
   * @param {Object} evt Событие клика мышки
   */

  function isLeftMouseButtonPressed(evt) {
    return evt.button === LEFT_MOUSE_BUTTON;
  }

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

  /**
   * @description Устанавливает изображение file в $preview
   * @param {Object} file Объект file
   * @param {Object} $previewImage DOM элемент для вставки изображения
   */

  function loadImage(file, $previewImage) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        $previewImage.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  /**
   *
   * @param {Object[]} array Массив объектов
   * @param {object} id Идентификатор
   */

  function getByID(array, id) {
    return array.filter(function (item) {
      return item.id === id;
    })[0];
  }

  /**
   * @description Откладывает выполнение callback на DEBOUNCE_INTERVAL
   * @param {function} callback Callback
   */

  function debounce(callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.util = util;
})();
