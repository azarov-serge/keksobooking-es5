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

  /**
   * @return {Object} {x:null, y:null}
   */

  function createCoords() {
    return ({x: null, y: null});
  }

  /**
   * @param {number} x Coord X
   * @return {number} Coord in the map
   */

  function setCoordX(x) {
    var GAP = MAIN_PIN_WIDTH / 2;
    var minX = MAP_MIN_X - GAP;
    var maxX = MAP_MAX_X - GAP;
    return Math.max(Math.min(x, maxX), minX);
  }

  /**
   * @param {number} y Coord Y
   * @return {number} Coord in the map
   */

  function setCoordY(y) {
    var minY = MAP_MIN_Y - MAIN_PIN_HEIGHT;
    var maxY = MAP_MAX_Y - MAIN_PIN_HEIGHT;
    return Math.max(Math.min(y, maxY), minY);
  }

  /**
   * @param {number} x Coord X
   * @param {number} y Coord Y
   * @return {Object} Coords in the map {x: number, y:number}
   */

  function setCoords(x, y) {
    return {
      x: setCoordX(x),
      y: setCoordY(y),
    };
  }

  /**
   * @param {Object} obj Coords {x: number, y:number}
   */

  function convertToLocation(obj) {
    return {
      x: Math.floor(obj.x + MAIN_PIN_WIDTH / 2),
      y: Math.floor(obj.y + MAIN_PIN_HEIGHT),
    };
  }

  /**
   * @param {Object} obj Coords {x: number, y:number}
   */

  function convertFromLocation(obj) {
    return {
      x: Math.floor(obj.x - PIN_WIDTH / 2),
      y: Math.floor(obj.y - PIN_HEIGHT),
    };
  }

  /**
   * @description Convert to number and remove "px" for a coord
   * @param {Object} coord Coords {x: number, y:number}
   */

  function convertToCoord(coord) {
    return parseInt(String(coord).replace('px', ''), 10);
  }

  /**
   * @description Convert to number and remove "px" for coords
   * @param {string} x Coord X
   * @param {string} y Coord Y
   * @return {Object} Coords {x: number, y:number}
   */

  function convertToCoords(x, y) {
    return {
      x: convertToCoord(x),
      y: convertToCoord(y),
    };
  }

  window.CoordsUtils = {
    createCoords: createCoords,
    setCoordX: setCoordX,
    setCoordY: setCoordY,
    setCoords: setCoords,
    convertToLocation: convertToLocation,
    convertFromLocation: convertFromLocation,
    convertToCoords: convertToCoords,
  };
})();
