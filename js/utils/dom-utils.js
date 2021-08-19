'use strict';
(function () {
  var RenderPosition = {
    BEFORE_BEGIN: 'BEFORE_BEGIN',
    AFTER_BEGIN: 'AFTER_BEGIN',
    BEFORE_END: 'BEFORE_END',
    AFTER_END: 'AFTER_END',
  };

  /**
   * @description Вставляет <$element> в <$container> на место <place>
   * @param {Object} container DOM-элемент, куда необходимо вставить view
   * @param {Object} element DOM-элемент, который необходимо вставить в container
   * @param {String} place Место вставки в container значение afterbegin || beforeend || DOMElement. По умолчанию beforeend
   */
  function render(container, element, place) {
    var rendElement = null;
    var rendContainer = getElement(container);

    if (Array.isArray(element)) {
      rendElement = createRenderFragment(element);
    } else {
      rendElement = getElement(element);
    }

    if (place instanceof Object) {
      var rendPlace = getElement(place);
      rendContainer.insertBefore(rendElement, rendPlace);
    } else {
      renderElement(rendContainer, rendElement, place);
    }
  }

  /**
 * @description Создает DOM элемент из шаблонной строки
 * @param {String} template Шаблон элемента в виде строки
 * @returns {Object} Возвращает DOM элемент
 */

  function createElement(template) {
    var newElement = document.createElement('div');
    newElement.innerHTML = template;

    return newElement.firstChild;
  }

  /**
 * @description Удаляет компонет
 * @param {Object} view Компонент
 */

  function remove(view) {
    view.getElement().remove();
    view.removeElement();
  }

  /**
 * @param {Object} element1 DOM-элемент | view
 * @param {Object} element2 DOM-элемент | view
 * @param {String} place Место вставки в container
 */
  function renderElement(element1, element2, place) {
    element1 = getElement(element1);
    element2 = getElement(element2);

    switch (place) {
      case RenderPosition.BEFORE_BEGIN:
        element1.before(element2);
        break;
      case RenderPosition.AFTER_BEGIN:
        element1.prepend(element2);
        break;
      case RenderPosition.BEFORE_END:
        element1.append(element2);
        break;
      case RenderPosition.AFTER_END:
        element1.after(element2);
        break;
      default:
        throw new Error('Unknown render position: ' + place);
    }
  }

  /**
   * @description Создает фрагмент с объектами для вставки
   * @param {Object[]} elements Массив DOM-элементов
   * @return {Object}
   */
  function createRenderFragment(elements) {
    var fragment = document.createDocumentFragment();

    elements.forEach(function (element) {
      var renderedElement = getElement(element);
      fragment.appendChild(renderedElement);
    });

    return fragment;
  }

  function getElement(element) {
    return element instanceof Element || element instanceof DocumentFragment ? element : element.getElement();
  }

  window.domUtils = {
    createElement: createElement,
    render: render,
    remove: remove,
    RenderPosition: RenderPosition,
  };
})();

