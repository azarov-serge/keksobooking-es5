'use strict';
(function () {
  var AbsctractComponent = window.AbsctractComponent;
  var Constant = window.Constant;
  var Util = window.Util;

  var HIDE_CLASS = 'hidden';

  var ROOM_TEXTS = ['комната', 'комнаты', 'комнат'];
  var GUEST_TEXTS = ['гостя', 'гостей', 'гостей'];

  function CardComponent(cardData) {
    AbsctractComponent.call(this);
    this._cardData = cardData;
    this.closeCardClickHandler = null;
    this.documentKeyDownHandler = null;
  }

  CardComponent.prototype = Object.create(AbsctractComponent.prototype);
  CardComponent.prototype.constructor = CardComponent;

  CardComponent.prototype._getTemplate = function () {

    /**
     * @param {*} cardData Данные объявления
     * @param {string} className Название класса элемента в шаблоне
     * @param {string} text Текст для вставки в элемент
     */

    function setText(cardData, className, text) {
      text = text || cardData;
      if (cardData) {
        $card.querySelector(className).textContent = text;
      } else {
        $card.querySelector(className).classList.add(HIDE_CLASS);
      }
    }

    /**
     * @param {*} cardData Адресс изображения
     * @param {string} className Название класса элемента в шаблоне
     */

    function setImage(cardData, className) {
      if (cardData) {
        $card.querySelector(className).src = cardData;
      } else {
        $card.querySelector(className).classList.add(HIDE_CLASS);
      }
    }

    /**
     * @description Функция по отрисовки удобств
     * @param {Object[]} features Массив строк удобств
     */

    function renderFeatures(cardData) {
      var $featuresContainer = $card.querySelector('.popup__features');
      if (cardData.length) {
        var $features = $featuresContainer.querySelectorAll('.popup__feature');
        $features.forEach(function ($feature) {
          var findFeature = $feature.className.split('--');
          if (cardData.indexOf(findFeature[1]) === -1) {
            $feature.classList.add(HIDE_CLASS);
          }
        });
      } else {
        $featuresContainer.classList.add(HIDE_CLASS);
      }
    }

    /**
     * @description Функция по отрисовки фото объекта
     * @param {Object[]} features Массив строк с фото (путь к фото)
     */

    function renderPhotos(cardData) {
      // Получить контейнер фотографий
      var $photosContainer = $card.querySelector('.popup__photos');
      // Получить шаблон изображений
      var $templatePhoto = $photosContainer.querySelector('img');
      // Если изображения есть, отрисовать
      if (cardData.length) {
        // Установить первое фото в массиве
        $templatePhoto.src = cardData[0];
        // Добавить в массив для рендеринга
        var $photos = [$templatePhoto];
        // Добавить фотографии, начиная со второй в массив для рендеринга
        for (var i = 1; i < cardData.length; i++) {
          // Склонировать шаблон
          var $photo = $templatePhoto.cloneNode(true);
          // Установить данные по фото из элемента массива
          $photo.src = cardData[i];
          // Добавить в массив для рендеринга
          $photos.push($photo);
        }
        // Отрисовать все фотографии объявления
        Util.render($photosContainer, $photos, Constant.RenderPosition.BEFOREEND);
      } else {
        // Если изображений нет, скрыть контейнер фотографий
        $photosContainer.classList.add(HIDE_CLASS);
      }
    }

    // Получить шаблона карточки
    var $template = document.querySelector('#card').content.querySelector('.map__card');
    // Склонировать шаблон
    var $card = $template.cloneNode(true);
    // Установить аватар, если есть
    setImage(this._cardData.author.avatar, '.popup__avatar');
    // Установить текст заголовка, если есть
    setText(this._cardData.offer.title, '.popup__title');
    // Установить адресс, если есть
    setText(this._cardData.offer.address, '.popup__text--address');
    // Установить цену, если есть
    setText(this._cardData.offer.price, '.popup__text--price', parseInt(this._cardData.offer.price, 10).toLocaleString() + '₽/ночь');
    // Установить тип жилья, если есть
    setText(
        this._cardData.offer.type,
        '.popup__type',
        this._cardData.offer.type ? Constant.bookingType[this._cardData.offer.type].title : ''
    );

    // Установить количество гостей и комнат, если есть
    setText(
        this._cardData.offer.rooms && this._cardData.offer.guests,
        '.popup__text--capacity',
        (
          this._cardData.offer.rooms + ' '
          + Util.getWordEnd(this._cardData.offer.rooms, ROOM_TEXTS)
          + ' для ' + this._cardData.offer.guests + ' '
          + Util.getWordEnd(this._cardData.offer.guests, GUEST_TEXTS)
        )
    );
    // Установить время заезда и время выезда, если есть
    setText(
        this._cardData.offer.checkin && this._cardData.offer.checkout,
        '.popup__text--time',
        'Заезд после ' + this._cardData.offer.checkin + ', выезд до ' + this._cardData.offer.checkout
    );

    // Отрисовать все доступные удобств в объявлении
    renderFeatures(this._cardData.offer.features);
    // Установить описание объявления, если есть
    setText(this._cardData.offer.description, '.popup__description', this._cardData.offer.description);
    // Отрисовать все фотографии объявления
    renderPhotos(this._cardData.offer.photos);

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
