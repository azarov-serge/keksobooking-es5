'use strict';
(function () {
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var bookingType = {
    any: 'Любой тип жилья',
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  var FeaturesValues = {
    WI_FI: 'wifi',
    PARKING: 'parking',
    DISHWASHER: 'dishwasher',
    ELEVATOR: 'elevator',
    WASHER: 'washer',
    CONDITIONER: 'conditioner',
  };

  var typeOptions = [
    {value: 'palace', title: 'Дворец'},
    {value: 'flat', title: 'Квартира'},
    {value: 'house', title: 'Дом'},
    {value: 'bungalo', title: 'Бунгало'},
  ];

  var timeInOptions = [
    {value: '12:00', title: 'После 12'},
    {value: '13:00', title: 'После 13'},
    {value: '14:00', title: 'После 14'},
  ];

  var timeOutOptions = [
    {value: '12:00', title: 'Выезд до 12'},
    {value: '13:00', title: 'Выезд до 13'},
    {value: '14:00', title: 'Выезд до 14'},
  ];

  var roomsOptions = [
    {value: '1', title: '1 комната'},
    {value: '2', title: '2 комнаты'},
    {value: '3', title: '3 комнаты'},
    {value: '100', title: '100 комнат'},
  ];

  var guestsOptions = [
    {value: '3', title: 'для 3 гостей'},
    {value: '2', title: 'для 2 гостей'},
    {value: '1', title: 'для 1 гостя'},
    {value: '0', title: 'не для гостей'},
  ];

  var featuresOptions = [
    {value: FeaturesValues.WI_FI, title: 'Wi-Fi'},
    {value: FeaturesValues.DISHWASHER, title: 'Посудомоечная машина'},
    {value: FeaturesValues.PARKING, title: 'Парковка'},
    {value: FeaturesValues.WASHER, title: 'Стиральная машина'},
    {value: FeaturesValues.ELEVATOR, title: 'Лифт'},
    {value: FeaturesValues.CONDITIONER, title: 'Кондиционер'},
  ];

  var typeToMinPrice = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0,
  };

  window.order = {
    DEFAULT_AVATAR: DEFAULT_AVATAR,
    FeaturesValues: FeaturesValues,
    bookingType: bookingType,
    typeToMinPrice: typeToMinPrice,
    typeOptions: typeOptions,
    roomsOptions: roomsOptions,
    timeInOptions: timeInOptions,
    timeOutOptions: timeOutOptions,
    guestsOptions: guestsOptions,
    featuresOptions: featuresOptions,
  };
})();
