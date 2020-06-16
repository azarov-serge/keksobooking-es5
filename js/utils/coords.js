'use strict';
(function () {
  var Coords = {
    create: create,
    setX: setX,
    setY: setY,
    set: set,
    convertToLocation: convertToLocation,
    convertFromLocation: convertFromLocation,
    convertToCoords: convertToCoords,
  };

  /**
   * @return {Object} {x:null, y:null}
   */

  function create() {
    return ({x: null, y: null});
  }

  /**
   * @param {number} x Координата X
   * @return {number} Координата в пределаха карты
   */

  function setX(x) {
    var minX = window.Constant.MAP_MIN_X;
    var maxX = window.Constant.MAP_MAX_X - window.Constant.MAIN_PIN_WIDTH;
    return Math.max(Math.min(x, maxX), minX);
  }

  /**
   * @param {number} y Координата Y
   * @return {number} Координата в пределаха карты
   */

  function setY(y) {
    var minY = window.Constant.MAP_MIN_Y - window.Constant.MAIN_PIN_HEIGHT;
    var maxY = window.Constant.MAP_MAX_Y - window.Constant.MAIN_PIN_HEIGHT;
    return Math.max(Math.min(y, maxY), minY);
  }

  /**
   * @param {number} x Координата X, которую нужно утановить
   * @param {number} y Координата Y, которую нужно утановить
   * @return {Object} Координаты {x: number, y:number}
   */

  function set(x, y) {
    return {
      x: setX(x),
      y: setY(y),
    };
  }

  /**
   * @param {Object} obj Координаты {x: number, y:number}
   */

  function convertToLocation(obj) {
    return {
      x: obj.x + Math.floor(window.Constant.MAIN_PIN_WIDTH / 2),
      y: obj.y + window.Constant.MAIN_PIN_HEIGHT
    };
  }

  /**
   * @param {Object} obj Координаты {x: number, y:number}
   */

  function convertFromLocation(obj) {
    return {
      x: obj.x - Math.floor(window.Constant.PIN_WIDTH / 2),
      y: obj.y - window.Constant.PIN_HEIGHT,
    };
  }

  /**
   * @description Удалит слово "px" у координат
   * @param {string} x Координата X, которую нужно сконвертировать
   * @param {string} y Координата Y, которую нужно сконвертировать
   * @return {Object} Координаты {x: number, y:number}
   */

  function convertToCoords(x, y) {
    return {
      x: convertToCoord(x),
      y: convertToCoord(y),
    };
  }

  /**
   * @description Конвертирует координату в число, удаляет "px" если есть
   * @param {Object} coord Координата
   */

  function convertToCoord(coord) {
    return parseInt(String(coord).replace('px', ''), 10);
  }

  window.Coords = Coords;
})();
