'use strict';
(function () {
  var MIN_FEATURES = 2;

  var avatars = [];

  var timePeriods = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var price = {
    min: 1000,
    max: 1000000,
  };

  var rooms = {
    min: 1,
    max: 10,
  };

  var guests = {
    min: 1,
    max: 10,
  };

  var bookingTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  var descriptions = [
    'Великолепный вариан в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
    'Без интернета, регистрации и СМС. Расположена на краю парка',
    'Уютное гнездышко для молодоженов',
    'Подходит для всех кто любит тишину.',
    'Находится в старинном центре города. Только для тех кто может себе позволить роскошь. Лакеев и прочих жокеев просим не беспокоить.',
    'Минимализм во всем. Для самых не требовательных.',
    'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
    'Тут красиво, светло и уютно. Кофе и печеньки бесплатно.',
    'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  /**
   *
   * @param {number} min
   * @param {number} max
   * @return {number}
   */

  function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  }

  /**
   *
   * @param {Object[]} arr Массив значений
   * @return {*} Рандомное значение
   */

  function getRandomArrValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   *
   * @param {Object[]} arr Исходный массив значений
   * @param {number} length Длинна массива, который нужно получить
   * @return {Object[]} Рандомный массив
   */

  function getRandomArr(arr, length) {
    length = length ? length : arr.length;
    var randomArr = arr.slice();
    randomArr.sort(function () {
      return Math.random() - 0.5;
    });
    return randomArr.slice(0, length);
  }

  /**
   *
   * @param {string} type Тип объекта бронирования
   * @return {string} Заголовок объекта бронирования
   */

  function generateTitle(type) {
    var REPLACE = 'object';
    var titles = [
      'object находится недалеко от метро',
      'object с самым красивым видом на центр года',
      'object для требовательных и богатых',
      'object для командировок',
      'object для одиноких путешественников',
      'object для компании друзей',
      'object для влюбленной пары',
    ];

    return getRandomArrValue(titles).replace(REPLACE, type);
  }

  /**
   *
   * @param {number} count Колочество аватаров для генерации
   * @return {string[]} Массив аваторов, строка типа img/avatars/user01.png'
   */

  function generateAvatars(count) {
    var genAvatars = new Array(count).fill('').map(function (genAvatar, index) {
      return 'img/avatars/user0' + genAvatar + (++index) + '.png';
    });
    return getRandomArr(genAvatars);
  }

  /**
   * @return {Object}
   */

  function generateOrder() {
    var avatar = avatars[0];
    avatars.shift();
    var locationX = window.Utils.setCoordX(getRandomInt(window.inf.mapMinX, window.inf.mapMaxX));
    var locationY = window.Utils.setCoordY(getRandomInt(window.inf.mapMinY, window.inf.mapMaxY));
    var offerType = getRandomArrValue(Object.keys(bookingTypes));

    return (
      {
        'author': {
          'avatar': avatar
        },
        'offer': {
          'title': generateTitle(bookingTypes[offerType]),
          'address': locationX + ', ' + locationY,
          'price': getRandomInt(price.min, price.max),
          'type': offerType,
          'rooms': getRandomInt(rooms.min, rooms.max),
          'guests': getRandomInt(guests.min, guests.max),
          'checkin': getRandomArrValue(timePeriods),
          'checkout': getRandomArrValue(timePeriods),
          'features': getRandomArr(features, getRandomInt(MIN_FEATURES, features.length)),
          'description': getRandomArrValue(descriptions),
          'photos': getRandomArr(photos)
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      }
    );
  }

  /**
   * @param {number} count Количество карточек букинга
   * @return {Object[]} Массив карточек букинга
   */

  function generateOrders(count) {
    avatars = generateAvatars(count);
    return new Array(count).fill('').map(generateOrder);
  }

  window.generateOrders = generateOrders;
})();
