'use strict';
(function () {
  var AbsctractComponent = window.AbsctractComponent;
  var Constant = window.Constant;
  var Util = window.Util;

  var CardSelector = {
    TEMPLATE: '#card',
    CARD: '.map__card',
    AVATAR: '.popup__avatar',
    TITLE: '.popup__title',
    ADDRESS: '.popup__text--address',
    PRICE: '.popup__text--price',
    TYPE: '.popup__type',
    CAPACITY: '.popup__text--capacity',
    TIME: '.popup__text--time',
    FEATURES: '.popup__features',
    FEATURE: '.popup__feature',
    PHOTOS: '.popup__photos',
    PHOTO: 'img',
    DESCRIPTION: '.popup__description',
    HIDE_CLASS: 'hidden',
  };

  var ROOM_TEXTS = ['комната', 'комнаты', 'комнат'];
  var GUEST_TEXTS = ['гостя', 'гостей', 'гостей'];

  function CardComponent(order) {
    AbsctractComponent.call(this);
    this._order = order;
    this.closeCardClickHandler = null;
    this.documentKeyDownHandler = null;
  }

  CardComponent.prototype = Object.create(AbsctractComponent.prototype);
  CardComponent.prototype.constructor = CardComponent;

  CardComponent.prototype._getTemplate = function () {

    /**
     * @param {*} order Данные объявления
     * @param {string} className Название класса элемента в шаблоне
     * @param {string} text Текст для вставки в элемент
     */

    function setText(order, className, text) {
      text = text || order;
      if (order) {
        $card.querySelector(className).textContent = text;
      } else {
        $card.querySelector(className).classList.add(CardSelector.HIDE_CLASS);
      }
    }

    /* @param {*} order Данные объявления
    * @param {string} className Название класса элемента в шаблоне
    * @param {string} text Текст для вставки в элемент
    */

    function setPrice(orderPrice, className) {
      if (!isNaN(parseInt(orderPrice, 10)) && (orderPrice >= 0)) {
        $card.querySelector(className).textContent = parseInt(orderPrice, 10).toLocaleString() + '₽/ночь';
      } else {
        $card.querySelector(className).classList.add(CardSelector.HIDE_CLASS);
      }
    }

    /**
     * @param {*} order Адресс изображения
     * @param {string} className Название класса элемента в шаблоне
     */

    function setImage(order, className) {
      if (order) {
        $card.querySelector(className).src = order;
      } else {
        $card.querySelector(className).classList.add(CardSelector.HIDE_CLASS);
      }
    }

    /**
     * @description Функция по отрисовки удобств
     * @param {Object[]} features Массив строк удобств
     */

    function renderFeatures(order) {
      var $featuresContainer = $card.querySelector(CardSelector.FEATURES);
      if (order.length) {
        var $features = $featuresContainer.querySelectorAll(CardSelector.FEATURE);
        $features.forEach(function ($feature) {
          var findFeature = $feature.className.split('--');
          if (!order.includes(findFeature[1])) {
            $feature.classList.add(CardSelector.HIDE_CLASS);
          }
        });
      } else {
        $featuresContainer.classList.add(CardSelector.HIDE_CLASS);
      }
    }

    /**
     * @description Функция по отрисовки фото объекта
     * @param {Object[]} features Массив строк с фото (путь к фото)
     */

    function renderPhotos(order) {
      // Получить контейнер фотографий
      var $photosContainer = $card.querySelector(CardSelector.PHOTOS);
      // Получить шаблон изображений
      var $templatePhoto = $photosContainer.querySelector(CardSelector.PHOTO);
      // Если изображения есть, отрисовать
      if (order.length) {
        // Установить первое фото в массиве
        $templatePhoto.src = order[0];
        // Добавить в массив для рендеринга
        var $photos = [$templatePhoto];
        // Добавить фотографии, начиная со второй в массив для рендеринга
        for (var index = 1; index < order.length; index++) {
          // Склонировать шаблон
          var $photo = $templatePhoto.cloneNode(true);
          // Установить данные по фото из элемента массива
          $photo.src = order[index];
          // Добавить в массив для рендеринга
          $photos.push($photo);
        }
        // Отрисовать все фотографии объявления
        Util.render($photosContainer, $photos, Constant.RenderPosition.BEFOREEND);
      } else {
        // Если изображений нет, скрыть контейнер фотографий
        $photosContainer.classList.add(CardSelector.HIDE_CLASS);
      }
    }

    // Получить шаблона карточки
    var $template = document.querySelector(CardSelector.TEMPLATE).content.querySelector(CardSelector.CARD);
    // Склонировать шаблон
    var $card = $template.cloneNode(true);
    // Установить аватар, если есть
    setImage(this._order.author.avatar, CardSelector.AVATAR);
    // Установить текст заголовка, если есть
    setText(this._order.offer.title, CardSelector.TITLE);
    // Установить адресс, если есть
    setText(this._order.offer.address, CardSelector.ADDRESS);
    // Установить цену, если есть
    setPrice(this._order.offer.price, CardSelector.PRICE);
    // Установить тип жилья, если есть
    setText(
        this._order.offer.type,
        CardSelector.TYPE,
        this._order.offer.type ? Constant.bookingType[this._order.offer.type].title : ''
    );

    // Установить количество гостей и комнат, если есть
    setText(
        this._order.offer.rooms && this._order.offer.guests,
        CardSelector.CAPACITY,
        (
          this._order.offer.rooms + ' '
          + Util.getWordEnd(this._order.offer.rooms, ROOM_TEXTS)
          + ' для ' + this._order.offer.guests + ' '
          + Util.getWordEnd(this._order.offer.guests, GUEST_TEXTS)
        )
    );
    // Установить время заезда и время выезда, если есть
    setText(
        this._order.offer.checkin && this._order.offer.checkout,
        CardSelector.TIME,
        'Заезд после ' + this._order.offer.checkin + ', выезд до ' + this._order.offer.checkout
    );

    // Отрисовать все доступные удобств в объявлении
    renderFeatures(this._order.offer.features);
    // Установить описание объявления, если есть
    setText(this._order.offer.description, CardSelector.DESCRIPTION, this._order.offer.description);
    // Отрисовать все фотографии объявления
    renderPhotos(this._order.offer.photos);

    return $card;
  };

  CardComponent.prototype.addCardListeners = function () {
    this.getElement().addEventListener('click', this.closeCardClickHandler);
    document.addEventListener('keydown', this.documentKeyDownHandler);
  };

  CardComponent.prototype.removeCardListeners = function () {
    document.removeEventListener('keydown', this.documentKeyDownHandler);
  };

  window.CardComponent = CardComponent;
})();
