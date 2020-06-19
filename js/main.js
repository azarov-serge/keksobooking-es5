'use strict';
(function () {
  var Util = window.Util;

  // Массив объявлений
  var orders = window.generateOrders(window.Constant.ORDER_COUNT);
  // Модель с объявлениями
  var ordersModel = new window.OrdersModel();
  // Карта страницы
  var mainMapComponent = new window.MainMapComponent();
  // Контейнер с пинами
  var mapPinsComponent = new window.MapPinsComponent(mainMapComponent.getElement());
  // Форма для размещения объявления
  var adFormConponent = new window.AdFormComponent();
  // Контроллер контейнера с пинами
  var mapPinsController = new window.MapPinsController(mapPinsComponent, ordersModel);
  // Контроллер формы
  var adFormController = new window.AdFormController(adFormConponent);
  // Координаты главного пина
  var mainPinCoords = null;

  /**
   * @description Активация карты
   */
  function activateMap() {
    // Получить координаты главного пина
    mainPinCoords = mapPinsController.getMainPinCoords();
    // Установить координаты в форму
    adFormController.setAddress(mainPinCoords);
    // Если карта не активирована, активировать
    if (!mainMapComponent.isActivate()) {
      // Переключить состояние карты на активное
      mainMapComponent.toggleState();
      // Переключить форму в активное состояние
      adFormConponent.toggleState();
      // Запустить слушателей по валидации формы
      adFormController.startValidate();
      // Положить данные в модель данных
      ordersModel.setOrders(orders);
      // Отрисовать пины на карте
      mapPinsController.renderPins();
      // Установить контейнер, куда отрисовывать карточку
      mapPinsController.setCardContainer(mainMapComponent.getElement());
      // Установить место, куда отрисовывать карточку
      mapPinsController.setCardPlace(mainMapComponent.getMapFilterContainer());
    }
  }

  // Активировать контроллер контейнера с пинами (сброс настроек компонента по умолчанию)
  mapPinsController.activate();
  // Получить координаты главного пина утсановленные по умолчанию
  mainPinCoords = mapPinsController.getMainPinDefaultCoords();
  // Активировать контроллер формы объявлений
  adFormController.activate();
  // Установить адрес на форму объявлений
  adFormController.setAddress(mainPinCoords);

  // Установить обработчик клика мыши у главного пина
  mapPinsComponent.getMainPin().addEventListener('mousedown', function (evt) {
    if (Util.isLeftMouseButtonPressed(evt)) {
      activateMap();
    }
  });

  // Установить обработчик клика клавиши у главного пина
  mapPinsComponent.getMainPin().addEventListener('keydown', function (evt) {
    if (Util.isEnterPressed(evt)) {
      activateMap();
    }
  });
})();
