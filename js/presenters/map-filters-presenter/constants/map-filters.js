'use strict';
(function () {
  var MapFiltersName = {
    TYPE: 'type',
    PRICE: 'price',
    ROOMS: 'rooms',
    GUESTS: 'guests',
  };

  var mapFilters = [
    {
      name: MapFiltersName.TYPE,
      options: [
        {
          value: 'any',
          title: 'Любой тип жилья',
        },
        {
          value: 'palace',
          title: 'Дворец',
        },
        {
          value: 'flat',
          title: 'Квартира',
        },
        {
          value: 'house',
          title: 'Дом',
        },
        {
          value: 'bungalo',
          title: 'Бунгало',
        },
      ],
    },
    {
      name: MapFiltersName.PRICE,
      options: [
        {
          value: 'any',
          title: 'Любая',
        },
        {
          value: 'middle',
          title: '10000 - 50000&#x20bd',
        },
        {
          value: 'low',
          title: 'до 10000&#x20bd;',
        },
        {
          value: 'high',
          title: 'от 50000&#x20bd;',
        },
      ],
    },
    {
      name: MapFiltersName.ROOMS,
      options: [
        {
          value: 'any',
          title: 'Любое число комнат',
        },
        {
          value: '1',
          title: 'Одна комната',
        },
        {
          value: '2',
          title: 'Две комнаты',
        },
        {
          value: '3',
          title: 'Три комнаты',
        },
      ],
    },
    {
      name: MapFiltersName.GUESTS,
      options: [
        {
          value: 'any',
          title: 'Любое число гостей',
        },
        {
          value: '2',
          title: 'Два гостя',
        },
        {
          value: '1',
          title: 'Один гость',
        },
        {
          value: '0',
          title: 'Не для гостей',
        },
      ],
    },
  ];

  window.MapFilters = {
    mapFilters: mapFilters,
    MapFiltersName: MapFiltersName,
  };
})();
