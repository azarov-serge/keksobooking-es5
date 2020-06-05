'use strict';
(function () {
  var coords = {
    create: create,
    setX: setX,
    setY: setY,
    set: set,
    convertToLocation: convertToLocation,
    convertFromLocation: convertFromLocation,
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
    var minX = window.Constants.MAP_MIN_X;
    var maxX = window.Constants.MAP_MAX_X - window.Constants.MAIN_PIN_WIDTH;
    return Math.max(Math.min(x, maxX), minX);
  }

  /**
   * @param {number} y Координата Y
   * @return {number} Координата в пределаха карты
   */

  function setY(y) {
    var minY = window.Constants.MAP_MIN_Y;
    var maxY = window.Constants.MAP_MAX_Y;
    return Math.max(Math.min(y, maxY), minY);
  }

  /**
   * @param {Object} obj Координаты {x: number, y:number}
   * @param {number} x Координата X, которую нужно утановить
   * @param {number} y Координата Y, которую нужно утановить
   */
  function set(obj, x, y) {
    obj.x = setX(x);
    obj.y = setY(y);
  }

  /**
   * @param {Object} obj Координаты {x: number, y:number}
   */
  function convertToLocation(obj) {
    obj.x += Math.floor(window.Constants.MAIN_PIN_WIDTH / 2);
    obj.y += window.Constants.MAIN_PIN_HEIGHT;
  }

  /**
   * @param {Object} obj Координаты {x: number, y:number}
   */
  function convertFromLocation(obj) {
    obj.x -= Math.floor(window.Constants.PIN_WIDTH / 2);
    obj.y -= window.Constants.PIN_HEIGHT;
  }

  window.coords = coords;
})();
