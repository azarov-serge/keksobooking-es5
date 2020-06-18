'use strict';
(function () {
  var Randomazier = {
    getRandomInt: getRandomInt,
    getRandomArrValue: getRandomArrValue,
    getRandomArr: getRandomArr,
  };

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

  window.Randomazier = Randomazier;
})();
