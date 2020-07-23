'use strict';
(function () {
  var coordsUtil = window.coordsUtil;
  var util = window.util;
  var DEFAULT_FILTER_INDEX = 0;

  var ordersModel = new window.OrdersModel();
  var mainMapComponent = new window.MainMapComponent();
  var mapPinsComponent = new window.MapPinsComponent(mainMapComponent.getElement());
  var adFormComponent = new window.AdFormComponent();
  var mapPinsController = new window.MapPinsController(mapPinsComponent, ordersModel);
  var adFormController = new window.AdFormController(adFormComponent);
  var api = new window.API();
  // Координаты главного пина
  var coordsMainPin = null;
  // Координаты события
  var coordsEvt = coordsUtil.create();
  // Сдвиг координат главного пина
  var coordsShift = coordsUtil.create();


  /**
   * @description Делает запрос к серверу, в случае успеха активирует карту
   */
  function start() {
    if (!mainMapComponent.isActivate()) {
      api.load();
    }
  }

  /**
   * @description Конвертирует координаты и устанавливает в поле адрес
   * @param {Object} coords Координаты {x, y}
   * @param {boolean} isDefault Установить по умолчанию
   */

  function setCoordsToAdress(coords, isDefault) {
    // Сконвертировать координаты в адресс
    coords = isDefault
      ? mapPinsController.getMainPinDefaultCoords()
      : coordsUtil.convertToLocation(coords);
    // Установить адресс в форму
    adFormController.setAddress(coords);
  }

  /**
   * @description Сброс фильтров на значение по умолчанию
   */

  function setDefaultFilters() {
    mainMapComponent.getMapFilters().forEach(function ($filter) {
      if ($filter.id !== 'housing-features') {
        $filter.value = $filter[DEFAULT_FILTER_INDEX].value;
      }
    });

    mainMapComponent.getMapFeaturesFilters().forEach(function ($featuresFilter) {
      $featuresFilter.checked = false;
    });
  }

  /**
   * @description Активация карты
   */

  function activateMap(orders) {
    // Получить координаты главного пина
    coordsMainPin = mapPinsController.getMainPinCoords();
    // Конвертация и установка координат
    setCoordsToAdress(coordsMainPin);
    // Переключить состояние карты на активное
    mainMapComponent.toggleState();
    // Переключить форму в активное состояние.
    adFormController.toggleState();
    // Запустить валидацию формы.
    adFormController.runValidity();
    // Загрузить обработчики событий preview для аватара и изображений
    adFormController.runLoadImagesListeners();
    // Положить данные в модель данных
    ordersModel.setOrders(orders);
    // Установить контейнер, куда отрисовывать карточку
    mapPinsController.setCardContainer(mainMapComponent.getElement());
    // Установить место, куда отрисовывать карточку
    mapPinsController.setCardPlace(mainMapComponent.getMapFiltersContainer());
    // Установить функцию для события отправки формы
    adFormComponent.adFormSubmitHandler = adFormSubmitHandler;
    // Запустить обработчики события для отправки формы
    adFormComponent.addAdFormSubmitListener();
    // Установить callbak для обработчика события кнопки reset
    adFormComponent.adFormResetHandler = deactivateMap;
    // Запустить обработчики события кнопки reset
    adFormComponent.addAdFormResetListener();
    setDefaultFilters();
    if (ordersModel.isOrdersExist()) {
      mainMapComponent.mapFiltersHandler = util.debounce(mapFiltersHandler);
      mainMapComponent.toggleStateMapFilters();
      mainMapComponent.addMapFiltersListener();
      // Отрисовать пины на карте
      mapFiltersHandler();
    }
  }

  /**
   * @param {Object} evt Событие
   * @description Деактивация карты
   */

  function deactivateMap() {
    // Переключить состояние карты на неактивное
    mainMapComponent.toggleState();
    // Установить значение пина по умолчанию в поле адресс формы
    setCoordsToAdress(coordsMainPin, true);
    // Установка фильтров по умолчанию
    setDefaultFilters();
    // Деактивировать контроллер контейнера с пинами (сброс настроек компонента по умолчанию)
    mapPinsController.deactivate();
    // Деактивировать контроллер контейнера с пинами (сброс настроек компонента по умолчанию)
    adFormController.deactivate();
    // Удалить обработчик отправки формы
    adFormComponent.removeAdFormSubmitListener();
    // Удалить обработчик события кнопки reset
    adFormComponent.removeAdFormResetListener();
    // Удалить обработчик события фильтров
    mainMapComponent.removeMapFiltersListener();
  }

  /**
   *
   * @description Функции для события submit у формы
   */

  function adFormSubmitHandler(evt) {
    if (evt.target.checkValidity()) {
      api.upload(evt.target);
      evt.preventDefault();
    }
  }

  /**
   * @description Нажатие клавиши мыши по главному пину
   * @param {*} evt Событие
   */

  function mapPinsMouseDownHandler(evt) {
    start();

    // Зафиксировать текущие координаты главного пина
    coordsEvt.x = evt.clientX;
    coordsEvt.y = evt.clientY;
    // Активировать обработчик события на перемещение мыши у главного пина
    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    // Активировать обработчик события на отпускание клавиши мыши у главного пина
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  }

  /**
   * @description Перемещение мыши у главного пина
   * @param {*} evt Событие
   */

  function mainPinMouseMoveHandler(evt) {
    evt.preventDefault();
    // Расчитать смещение главного пина
    coordsShift.x = coordsEvt.x - evt.clientX;
    coordsShift.y = coordsEvt.y - evt.clientY;
    // Зафиксировать текущие координаты главного пина
    coordsEvt.x = evt.clientX;
    coordsEvt.y = evt.clientY;
    // Вычислить координаты главного пина в допустимых пределах карты
    coordsMainPin = coordsUtil.set(
        mapPinsComponent.getMainPin().offsetLeft - coordsShift.x,
        mapPinsComponent.getMainPin().offsetTop - coordsShift.y
    );
    // Установить координаты главного пина в допустимых пределах карты
    mapPinsComponent.getMainPin().style.left = coordsMainPin.x + 'px';
    mapPinsComponent.getMainPin().style.top = coordsMainPin.y + 'px';
    // Конвертация и установка координат
    setCoordsToAdress(coordsMainPin);
  }

  /**
   * @description Отпускание клавиши мыши у главного пина
   * @param {*} evt Событие
   */

  function mainPinMouseUpHandler(evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', mainPinMouseMoveHandler);
    document.removeEventListener('mouseup', mainPinMouseUpHandler);
  }

  /**
   * @description Событие на изменение фильтров
   */

  function setFilterToOrdersModel() {
    var features = [];
    mainMapComponent.getMapFilters().forEach(function ($filter) {
      if ($filter.id !== 'housing-features') {
        ordersModel.filters[$filter.id].value = $filter.value;
      }
    });

    mainMapComponent.getMapFeaturesFilters().forEach(function ($featuresFilter) {
      if ($featuresFilter.checked) {
        features.push($featuresFilter.value);
      }
    });

    ordersModel.filters['housing-features'].value = features;
  }

  /**
  * @description Событие на изменение фильтров
  */

  function mapFiltersHandler() {
    setFilterToOrdersModel();
    mapPinsController.renderPins(ordersModel.getOrdersByFilters());
  }

  // Активировать контроллер контейнера с пинами (сброс настроек компонента по умолчанию)
  mapPinsController.activate();
  // Активировать контроллер формы объявлений
  adFormController.activate();
  // Установить значение пина по умолчанию в поле адресс формы
  setCoordsToAdress(coordsMainPin, true);
  api.setSuccessLoadHandler(activateMap);
  api.setSuccessUploadHandler(deactivateMap);

  // Отключить фильтры если включены
  if (mainMapComponent.isMapFiltersActivate()) {
    mainMapComponent.toggleStateMapFilters();
  }

  // Установить обработчик клика мыши у главного пина
  mapPinsComponent.getMainPin().addEventListener('mousedown', function (evt) {
    if (util.isLeftMouseButtonPressed(evt)) {
      evt.preventDefault();
      mapPinsMouseDownHandler(evt);
    }
  });

  // Установить обработчик клика клавиши у главного пина
  mapPinsComponent.getMainPin().addEventListener('keydown', function (evt) {
    if (util.isEnterPressed(evt)) {
      evt.preventDefault();
      start();
    }
  });
})();
