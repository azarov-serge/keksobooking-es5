'use strict';
(function () {
  var Constant = window.coordsUtils.Constants;
  var bookingType = window.offer.bookingType;
  var coordsUtils = window.coordsUtils;
  var Randomazier = window.Randomazier;


  var MIN_FEATURES = 2;
  var AVATARS_COUNT = 8;

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

  var titles = [
    'object находится недалеко от метро',
    'object с самым красивым видом на центр года',
    'object для требовательных и богатых',
    'object для командировок',
    'object для одиноких путешественников',
    'object для компании друзей',
    'object для влюбленной пары',
  ];

  /**
    *
    * @param {string} type Тип объекта бронирования
    * @return {string} Заголовок объекта бронирования
    */

  function generateTitle(type) {
    var REPLACE = 'object';

    return Randomazier.getRandomArrValue(titles).replace(REPLACE, type);
  }

  /**
    * @return {Object}
    */

  function generateOrder(_, index) {
    var coordsOrder = coordsUtils.setCoords(
        Randomazier.getRandomInt(Constant.MAP_MIN_X, Constant.MAP_MAX_X),
        Randomazier.getRandomInt(Constant.MAP_MIN_Y, Constant.MAP_MAX_Y)
    );

    coordsOrder = coordsUtils.convertToLocationCoords(coordsOrder);

    var offerType = Randomazier.getRandomArrValue(Object.keys(bookingType));

    return {
      'author': {
        'avatar': 'img/avatars/' + (index < AVATARS_COUNT ? 'user0' + (index + 1) : 'default') + '.png',
      },
      'offer': {
        'title': generateTitle(bookingType[offerType].title),
        'address': coordsOrder.x + ', ' + coordsOrder.y,
        'price': Randomazier.getRandomInt(price.min, price.max),
        'type': offerType,
        'rooms': Randomazier.getRandomInt(rooms.min, rooms.max),
        'guests': Randomazier.getRandomInt(guests.min, guests.max),
        'checkin': Randomazier.getRandomArrValue(timePeriods),
        'checkout': Randomazier.getRandomArrValue(timePeriods),
        'features': Randomazier.getRandomArr(features, Randomazier.getRandomInt(MIN_FEATURES, features.length)),
        'description': Randomazier.getRandomArrValue(descriptions),
        'photos': Randomazier.getRandomArr(photos, Randomazier.getRandomInt(1, photos.length + 1)),
      },
      'location': {
        'x': coordsOrder.x,
        'y': coordsOrder.y
      }
    };
  }

  /**
    * @param {number} count Количество карточек букинга
    * @return {Object[]} Массив карточек букинга
    */

  function generateOrders(count) {
    return new Array(count).fill('').map(generateOrder);
  }

  window.generateOrders = generateOrders;
})();
