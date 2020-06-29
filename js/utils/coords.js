'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 82;
  var MAP_MIN_X = 0;
  var MAP_MAX_X = 1200;
  var MAP_MIN_Y = 130;
  var MAP_MAX_Y = 630;

  var coordsUtil = {
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
    var GAP = MAIN_PIN_WIDTH / 2;
    var minX = MAP_MIN_X - GAP;
    var maxX = MAP_MAX_X - GAP;
    return Math.max(Math.min(x, maxX), minX);
  }

  /**
   * @param {number} y Координата Y
   * @return {number} Координата в пределаха карты
   */

  function setY(y) {
    var minY = MAP_MIN_Y - MAIN_PIN_HEIGHT;
    var maxY = MAP_MAX_Y - MAIN_PIN_HEIGHT;
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
      x: Math.floor(obj.x + MAIN_PIN_WIDTH / 2),
      y: Math.floor(obj.y + MAIN_PIN_HEIGHT),
    };
  }

  /**
   * @param {Object} obj Координаты {x: number, y:number}
   */

  function convertFromLocation(obj) {
    return {
      x: Math.floor(obj.x - PIN_WIDTH / 2),
      y: Math.floor(obj.y - PIN_HEIGHT),
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

  window.coordsUtil = coordsUtil;
})();
