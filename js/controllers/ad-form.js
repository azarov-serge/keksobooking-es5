'use strict';
(function () {
  var Constant = window.Constant;
  var Util = window.Util;

  // Индекс значения по умолчанию
  var DefaultIndex = {
    ROOMS: 0,
    TYPE: 1,
    CHECK_IN: 0,
  };

  function AdFormController(adFormComponent) {
    this._adFormComponent = adFormComponent;
  }

  /**
   * @description Активирует контроллер
   */

  AdFormController.prototype.activate = function () {
    // Синхронизировать fieldsets и form
    if (this._adFormComponent.isActivate() !== this._adFormComponent.isActivateFieldsets()) {
      this._adFormComponent.toggleStateFieldsets();
    }

    this.setDefaultValues();
    this._adFormComponent.getAdImages().multiple = 'multiple';
  };

  /**
   * @description Деактивирует контроллер
   */

  AdFormController.prototype.deactivate = function () {
    // Переключить форму в неактивное состояние
    this.toggleState();
    this.setDefaultValues();
    this.stopValidity();
    this.stopLoadImagesListeners();
  };

  /**
   * @description Переключает состояние формы и поля
   */

  AdFormController.prototype.toggleState = function () {
    this._adFormComponent.toggleState();
    this._adFormComponent.toggleStateFieldsets();
  };

  /**
   * @description Запустить валидацию
   */

  AdFormController.prototype.runValidity = function () {
    this._adFormComponent.getAdAddress().readOnly = true;
    this._adFormComponent.getAdAvatar().accept = Constant.ValidateValue.IMAGES_AVATAR;
    this._adFormComponent.getAdImages().accept = Constant.ValidateValue.IMAGES_AD;
    this._adFormComponent.getAdPrice().max = Constant.ValidateValue.MAX_PRICE;
    // Установить валидацию заголовка объявления
    this._setValidityTitle();
    // Установить функцию для обработчиков событий валидации
    this._setValidityHandlers();
    // Запустить обработчики событий для валидации формы
    this._adFormComponent.addAdFormValidityListeners();
  };

  /**
   * @description Остановливает валидацию формы
   */

  AdFormController.prototype.stopValidity = function () {
    this._adFormComponent.removeAdFormValidityListeners();
  };

  /**
   * @description Устанавливает адресс в поле адресса
   */

  AdFormController.prototype.setAddress = function (coords) {
    this._adFormComponent.getAdAddress().value = coords.x + ', ' + coords.y;
  };

  /**
   * @description Устанавливает значения по умолчанию
   */

  AdFormController.prototype.setDefaultValues = function () {
    // Значения по умолчанию
    var Default = {
      EMPTY_STRING: '',
      ROOMS: this._adFormComponent.getAdRooms()[DefaultIndex.ROOMS].value,
      TYPE: this._adFormComponent.getAdType()[DefaultIndex.TYPE].value,
      CHECK_IN: this._adFormComponent.getAdCheckIn()[DefaultIndex.CHECK_IN].value,
      DEFAULT_AVATAR: 'img/muffin-grey.svg',
    };

    function toggleDefaultFeature($feature) {
      $feature.checked = false;
    }

    this._adFormComponent.getAdAvatar().value = Default.EMPTY_STRING;
    this._adFormComponent.getAdAvatarPreview().querySelector('img').src = Default.DEFAULT_AVATAR;
    this._adFormComponent.getAdImages().value = Default.EMPTY_STRING;
    this._clearAdImagesContainer();
    this._adFormComponent.getAdTitle().value = Default.EMPTY_STRING;
    this._adFormComponent.getAdRooms().value = Default.ROOMS;
    this._adFormComponent.getAdGuests().value = this._getGuests(Default.ROOMS);
    this._disabledGuestsValues(Default.ROOMS);
    this._adFormComponent.getAdType().value = Default.TYPE;
    this._adFormComponent.getAdPrice().required = true;
    this._setMinPrice(Constant.bookingType[Default.TYPE].minPrice);
    this._adFormComponent.getAdPrice().value = Default.EMPTY_STRING;
    this._adFormComponent.getAdCheckIn().value = Default.CHECK_IN;
    this._adFormComponent.getAdCheckOut().value = this._adFormComponent.getAdCheckIn().value;
    this._adFormComponent.getAdDescription().value = Default.EMPTY_STRING;
    this._adFormComponent._getFeatures().forEach(toggleDefaultFeature);
  };

  /**
   * @description Запустить обработчики событий по загрузке файлов
   */

  AdFormController.prototype.runLoadImagesListeners = function () {
    this._setLoadHandlers();
    this._adFormComponent.addAdAvatarListener();
    this._adFormComponent.addAdImagesListener();
  };

  /**
   * @description Остановливает загрузку файлов
   */

  AdFormController.prototype.stopLoadImagesListeners = function () {
    this._adFormComponent.removeAdAvatarListener();
    this._adFormComponent.removeAdImagesListener();
  };

  /**
   * @description Устанавливает callbacks для валидации
   */

  AdFormController.prototype._setValidityHandlers = function () {
    this._adFormComponent.adRoomsChangeHandler = this._adRoomsChangeHandler.bind(this);
    this._adFormComponent.adTypeChangeHandler = this._adTypeChangeHandler.bind(this);
    this._adFormComponent.adCheckInChangeHandler = this._adCheckInChangeHandler.bind(this);
    this._adFormComponent.adCheckOutChangeHandler = this._adCheckOutChangeHandler.bind(this);
  };

  /**
   * @description Валидация заголовка
   */

  AdFormController.prototype._setValidityTitle = function () {
    this._adFormComponent.getAdTitle().required = true;
    this._adFormComponent.getAdTitle().minLength = Constant.ValidateValue.TITLE_MIN_LENGTH;
    this._adFormComponent.getAdTitle().maxLength = Constant.ValidateValue.TITLE_MAX_LENGTH;
  };

  /**
   * @description Валидация количества комнат
   */

  AdFormController.prototype._adRoomsChangeHandler = function (evt) {
    var roomsCount = parseInt(evt.target.value, 10);
    this._adFormComponent.getAdGuests().value = this._getGuests(roomsCount);
    this._disabledGuestsValues(this._adFormComponent.getAdGuests().value);
  };

  /**
   * @description Валидация цен типа жилья
   */

  AdFormController.prototype._adTypeChangeHandler = function (evt) {
    var minPrice = Constant.bookingType[evt.target.value].minPrice;
    this._setMinPrice(minPrice);
  };

  /**
   * @description Валидация времени заезада
   */

  AdFormController.prototype._adCheckInChangeHandler = function (evt) {
    this._adFormComponent.getAdCheckOut().value = evt.target.value;
  };

  /**
   * @description Валидация времени выезда
   */

  AdFormController.prototype._adCheckOutChangeHandler = function (evt) {
    this._adFormComponent.getAdCheckIn().value = evt.target.value;
  };

  /**
   * @param {number} rooms Количество комнат
   * @return {number} Количество гостей
   */

  AdFormController.prototype._getGuests = function (rooms) {
    if (rooms === Constant.ValidateValue.MAX_ROOMS_COUNT) {
      return Constant.ValidateValue.NOT_GUESTS;
    }

    return rooms;
  };

  /**
   * @description Переключает элементы фильтра количества гостей: enabled || diasabled
   * @param {string} validValue
   */

  AdFormController.prototype._disabledGuestsValues = function (validValue) {
    var NOT_GUESTS = Constant.ValidateValue.NOT_GUESTS;

    /**
     * @description Переключает элемент фильтра: enabled || diasabled
     * @param {Object} $item Элемент филтра (option у select)
     */

    function toggleItem($item) {
      var itemValue = parseInt($item.value, 10);
      if (validValue === NOT_GUESTS) {
        $item.disabled = itemValue !== validValue;
      } else {
        $item.disabled = !((itemValue <= validValue) && (itemValue !== NOT_GUESTS));
      }
    }

    validValue = parseInt(validValue, 10);
    this._adFormComponent.getAdGuests().querySelectorAll('option').forEach(toggleItem);
  };

  /**
   * @description Валидация цен типа жилья
   */

  AdFormController.prototype._setMinPrice = function (minPrice) {
    this._adFormComponent.getAdPrice().placeholder = minPrice;
    this._adFormComponent.getAdPrice().min = minPrice;
  };

  /**
   * @description Устанавливает callbacks для загрузки изображений
   */

  AdFormController.prototype._setLoadHandlers = function () {
    this._adFormComponent.adAvatarChangeHandler = this._adAvatarChangeHandler.bind(this);
    this._adFormComponent.adAdImagesChangeHandler = this._addAdImagesChangeHandler.bind(this);
  };

  /**
   * @description Загружает изображение для аватара
   */

  AdFormController.prototype._adAvatarChangeHandler = function () {
    var file = this._adFormComponent.getAdAvatar().files[0];
    var $previewImage = this._adFormComponent.getAdAvatarPreview().querySelector('img');
    Util.loadImage(file, $previewImage);
  };

  /**
   * @description Загружает изображение для фотографии жилья
   */

  AdFormController.prototype._addAdImagesChangeHandler = function () {
    var files = this._adFormComponent.getAdImages().files;
    this._clearAdImagesContainer();

    for (var index = 0; index < files.length; index++) {
      var $previewContainer = this._adFormComponent.getAdImagesContainer();
      var $preview = this._adFormComponent.getAdImagesPreview();

      if (!$preview.querySelector('img')) {
        var $previewImage = document.createElement('img');
        Util.loadImage(files[index], $previewImage);
        Util.render($preview, $previewImage, Constant.RenderPosition.BEFOREEND);
      } else {
        $preview = $preview.cloneNode(true);
        $previewImage = $preview.querySelector('img');
        Util.loadImage(files[index], $previewImage);
        Util.render($previewContainer, $preview, Constant.RenderPosition.BEFOREEND);
      }
    }
  };

  /**
   * @description Очищает контейнер с Preview изображений
   */

  AdFormController.prototype._clearAdImagesContainer = function () {
    this._adFormComponent.getAllAdImagesPreviews().forEach(function ($adImagesPreview, index) {
      if (index === 0) {
        $adImagesPreview.innerHTML = '';
      } else {
        $adImagesPreview.parentElement.removeChild($adImagesPreview);
      }
    });
  };

  window.AdFormController = AdFormController;
})();
