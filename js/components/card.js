'use strict';
(function () {
  var Constant = window.Constant;
  var Util = window.Util;

  var HIDE_CLASS = 'hidden';

  function CardComponent(data) {
    window.AbsctractComponent.call(this);
    this._data = data;
    this._closeCardClickHandler = this.__closeCardClickHandler.bind(this);
    this._documentKeyDownEscHandler = this.__documentKeyDownEscHandler.bind(this);
    this._closeCard = null;
  }

  CardComponent.prototype = Object.create(window.AbsctractComponent.prototype);
  CardComponent.prototype.constructor = CardComponent;

  CardComponent.prototype._getTemplate = function () {

    /**
     * @param {*} data Данные объявления
     * @param {string} className Название класса элемента в шаблоне
     * @param {string} text Текст для вставки в элемент
     */

    function setText(data, className, text) {
      text = text || data;
      if (data) {
        $card.querySelector(className).textContent = text;
      } else {
        $card.querySelector(className).classList.add(HIDE_CLASS);
      }
    }

    /**
     * @param {*} data Адресс изображения
     * @param {string} className Название класса элемента в шаблоне
     */

    function setImage(data, className) {
      if (data) {
        $card.querySelector(className).src = data;
      } else {
        $card.querySelector(className).classList.add(HIDE_CLASS);
      }
    }

    /**
     * @description Функция по отрисовки удобств
     * @param {Object[]} features Массив строк удобств
     */

    function renderFeatures(data) {
      var $featuresContainer = $card.querySelector('.popup__features');
      if (data.length) {
        var $features = $featuresContainer.querySelectorAll('.popup__feature');
        $features.forEach(function ($feature) {
          var findFeature = $feature.className.split('--');
          if (data.indexOf(findFeature[1]) === -1) {
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

    function renderPhotos(data) {
      // Получить контейнер фотографий
      var $photosContainer = $card.querySelector('.popup__photos');
      // Получить шаблон изображений
      var $templatePhoto = $photosContainer.querySelector('img');
      // Если изображения есть, отрисовать
      if (data.length) {
        // Установить первое фото в массиве
        $templatePhoto.src = data[0];
        // Добавить в массив для рендеринга
        var $photos = [$templatePhoto];
        // Добавить фотографии, начиная со второй в массив для рендеринга
        for (var i = 1; i < data.length; i++) {
          // Склонировать шаблон
          var $photo = $templatePhoto.cloneNode(true);
          // Установить данные по фото из элемента массива
          $photo.src = data[i];
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
    setImage(this._data.author.avatar, '.popup__avatar');
    // Установить текст заголовка, если есть
    setText(this._data.offer.title, '.popup__title');
    // Установить адресс, если есть
    setText(this._data.offer.address, '.popup__text--address');
    // Установить цену, если есть
    setText(this._data.offer.price, '.popup__text--price', parseInt(this._data.offer.price, 10).toLocaleString() + '₽/ночь');
    // Установить тип жилья, если есть
    setText(
        this._data.offer.type,
        '.popup__type',
        this._data.offer.type ? Constant.bookingTypes[this._data.offer.type].title : ''
    );

    // Установить количество гостей и комнат, если есть
    setText(
        this._data.offer.rooms && this._data.offer.guests,
        '.popup__text--capacity',
        (
          this._data.offer.rooms + ' '
          + Util.getWordEnd(this._data.offer.rooms, Constant.roomTexts)
          + ' для ' + this._data.offer.guests + ' '
          + Util.getWordEnd(this._data.offer.guests, Constant.guestTexts)
        )
    );
    // Установить время заезда и время выезда, если есть
    setText(
        this._data.offer.checkin && this._data.offer.checkout,
        '.popup__text--time',
        'Заезд после ' + this._data.offer.checkin + ', выезд до ' + this._data.offer.checkout
    );

    // Отрисовать все доступные удобств в объявлении
    renderFeatures(this._data.offer.features);
    // Установить описание объявления, если есть
    setText(this._data.offer.description, '.popup__description', this._data.offer.description);
    // Отрисовать все фотографии объявления
    renderPhotos(this._data.offer.photos);

    return $card;
  };

  CardComponent.prototype.setCloseCardHandler = function (closeCardHandler) {
    this._closeCard = closeCardHandler;
    this.getElement().querySelector('.popup__close').addEventListener('click', this._closeCardClickHandler);
    document.addEventListener('keydown', this._documentKeyDownEscHandler);
  };

  CardComponent.prototype.__closeCardClickHandler = function () {
    this._closeCard();
    document.removeEventListener('keydown', this._documentKeyDownEscHandler);
  };

  CardComponent.prototype.__documentKeyDownEscHandler = function (evt) {
    if (Util.isEscPressed(evt)) {
      this.__closeCardClickHandler();
    }
  };

  window.CardComponent = CardComponent;
})();
