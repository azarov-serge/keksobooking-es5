'use strict';
(function () {
  var CoordsUtil = window.CoordsUtil;
  var Util = window.Util;
  var DEFAULT_FILTER_INDEX = 0;

  var ordersModel = new window.OrdersModel();
  var mainMapComponent = new window.MainMapComponent();
  var mapPinsComponent = new window.MapPinsComponent(mainMapComponent.getElement());
  var adFormComponent = new window.AdFormComponent();
  var mapPinsController = new window.MapPinsController(mapPinsComponent, ordersModel);
  var adFormController = new window.AdFormController(adFormComponent);
  var backendController = new window.BackendController();
  // Координаты главного пина
  var coordsMainPin = null;
  // Координаты события
  var coordsEvt = CoordsUtil.create();
  // Сдвиг координат главного пина
  var coordsShift = CoordsUtil.create();

  /**
   * @description Устанавливает значение пина по умолчанию в поле адресс формы
   */

  function setDefaultCoordsToForm() {
    coordsMainPin = mapPinsController.getMainPinDefaultCoords();
    adFormController.setAddress(coordsMainPin);
  }

  function setDefaultFilters() {
    mainMapComponent.getMapFilters().forEach(function ($filter) {
      $filter.value = $filter[DEFAULT_FILTER_INDEX].value;
    });
  }

  /**
   * @description Активация карты
   */

  function activateMap(orders) {
    // Получить координаты главного пина
    coordsMainPin = mapPinsController.getMainPinCoords();
    // Установить адресс в форму
    adFormController.setAddress(coordsMainPin);
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
    // Отрисовать пины на карте
    mapPinsController.renderPins(ordersModel.getOrders());
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
      mainMapComponent.mapFiltersHandler = mapFiltersHandler;
      mainMapComponent.toggleStateMapFilters();
      mainMapComponent.addMapFiltersListener();
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
    setDefaultCoordsToForm();
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
      backendController.upload(evt.target);
      evt.preventDefault();
    }
  }

  /**
   * @description Нажатие клавиши мыши по главному пину
   * @param {*} evt Событие
   */

  function mapPinsMouseDownHandler(evt) {
    if (!mainMapComponent.isActivate()) {
      backendController.load();
    }

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
    coordsMainPin.x = CoordsUtil.setX(mapPinsComponent.getMainPin().offsetLeft - coordsShift.x);
    coordsMainPin.y = CoordsUtil.setY(mapPinsComponent.getMainPin().offsetTop - coordsShift.y);
    // Установить координаты главного пина в допустимых пределах карты
    mapPinsComponent.getMainPin().style.left = coordsMainPin.x + 'px';
    mapPinsComponent.getMainPin().style.top = coordsMainPin.y + 'px';
    // Сконвертировать координаты в адресс
    coordsMainPin = CoordsUtil.convertToLocation(coordsMainPin);
    // Установить адресс в форму
    adFormController.setAddress(coordsMainPin);
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
    mainMapComponent.getMapFilters().forEach(function ($filter) {
      ordersModel.filters[$filter.id].value = $filter.value;
    });
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
  setDefaultCoordsToForm();
  backendController.setSuccessLoadHandler(activateMap);
  backendController.setSuccessUploadHandler(deactivateMap);
  adFormController._clearAdImagesContainer();
  // Отключить фильтры если включены
  if (mainMapComponent.isMapFiltersActivate()) {
    mainMapComponent.toggleStateMapFilters();
  }

  // Установить обработчик клика мыши у главного пина
  mapPinsComponent.getMainPin().addEventListener('mousedown', function (evt) {
    if (Util.isLeftMouseButtonPressed(evt)) {
      evt.preventDefault();
      mapPinsMouseDownHandler(evt);
    }
  });

  // Установить обработчик клика клавиши у главного пина
  mapPinsComponent.getMainPin().addEventListener('keydown', function (evt) {
    if (Util.isEnterPressed(evt)) {
      evt.preventDefault();
      backendController.load();
    }
  });
})();
