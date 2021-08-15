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
   * @return {{x: Null, y: Null}}
   */

  function createCoords() {
    return ({x: null, y: null});
  }

  /**
   * @param {Number} x Coord X
   * @return {Number} Coord in the map
   */

  function setCoordX(x) {
    var GAP = MAIN_PIN_WIDTH / 2;
    var minX = MAP_MIN_X - GAP;
    var maxX = MAP_MAX_X - GAP;
    return Math.max(Math.min(x, maxX), minX);
  }

  /**
   * @param {Number} y Coord Y
   * @return {Number} Coord in the map
   */

  function setCoordY(y) {
    var minY = MAP_MIN_Y - MAIN_PIN_HEIGHT;
    var maxY = MAP_MAX_Y - MAIN_PIN_HEIGHT;
    return Math.max(Math.min(y, maxY), minY);
  }

  /**
   * @param {Number} x Coord X
   * @param {Number} y Coord Y
   * @return {{x: Number, y: Number}} Coords in the map
   */

  function setCoords(x, y) {
    return {
      x: setCoordX(x),
      y: setCoordY(y),
    };
  }

  /**
   * @param {{x: Number, y: Number}} coords
   * @return {{x: Number, y: Number}}
   */

  function convertToLocationCoords(coords) {
    return {
      x: Math.floor(coords.x + MAIN_PIN_WIDTH / 2),
      y: Math.floor(coords.y + MAIN_PIN_HEIGHT),
    };
  }

  /**
   * @param {{x: Number, y: Number}} coords
   * @return {{x: Number, y: Number}}
   */

  function convertToMapCoords(coords) {
    return {
      x: Math.floor(coords.x - PIN_WIDTH / 2),
      y: Math.floor(coords.y - PIN_HEIGHT),
    };
  }

  /**
   * @description Convert to number and remove "px" for a coord
   * @param {Number | String} coord
   */

  function convertToCoord(coord) {
    return parseInt(String(coord).replace('px', ''), 10);
  }

  /**
   * @description Convert to number and remove "px" for coords
   * @param {String} x Coord X
   * @param {String} y Coord Y
   * @return {{x: Number, y: Number}}
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
    convertToLocationCoords: convertToLocationCoords,
    convertToMapCoords: convertToMapCoords,
    convertToCoords: convertToCoords,
    Constants: {
      PIN_WIDTH: 50,
      PIN_HEIGHT: 70,
      MAIN_PIN_WIDTH: 65,
      MAIN_PIN_HEIGHT: 82,
      MAP_MIN_X: 0,
      MAP_MAX_X: 1200,
      MAP_MIN_Y: 130,
      MAP_MAX_Y: 630,
    }
  };
})();
