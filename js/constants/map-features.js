'use strict';
(function () {
  var MapFeaturesValues = {
    WI_FI: 'wifi',
    PARKING: 'parking',
    DISHWASHER: 'dishwasher',
    ELEVATOR: 'elevator',
    WASHER: 'washer',
    CONDITIONER: 'conditioner',
  };

  var mapFeatures = [
    {
      value: MapFeaturesValues.WI_FI,
      title: 'Wi-Fi',
    },
    {
      value: MapFeaturesValues.DISHWASHER,
      title: 'Посудомоечная машина',
    },
    {
      value: MapFeaturesValues.PARKING,
      title: 'Парковка',
    },
    {
      value: MapFeaturesValues.WASHER,
      title: 'Стиральная машина',
    },
    {
      value: MapFeaturesValues.ELEVATOR,
      title: 'Лифт',
    },
    {
      value: MapFeaturesValues.CONDITIONER,
      title: 'Кондиционер',
    },
  ];

  window.MapFeatures = {
    MapFeaturesValues: MapFeaturesValues,
    mapFeatures: mapFeatures,
  };
})();
