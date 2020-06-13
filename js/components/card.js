'use strict';
(function () {
  function Card(data) {
    window.AbsctractComponent.call(this);
    this._data = data;
    this._onCloseCard = null;
    this._closeCard = this._closeCard.bind(this);
    this._onKeyDownEsc = this._onKeyDownEsc.bind(this);
  }

  Card.prototype = Object.create(window.AbsctractComponent.prototype);
  Card.prototype.constructor = Card;

  Card.prototype._getTemplate = function () {
    /**
     * @description Функция по отрисовки удобств
     * @param {Object[]} features Массив строк удобств
     */

    function renderFeatures(features) {
      var $featuresContainer = $card.querySelector('.popup__features');
      var $features = $featuresContainer.querySelectorAll('.popup__feature');
      $features.forEach(function ($feature) {
        var findFeature = $feature.className.split('--');
        if (features.indexOf(findFeature[1]) === -1) {
          $featuresContainer.removeChild($feature);
        }
      });
    }

    /**
     * @description Функция по отрисовки фото объекта
     * @param {Object[]} features Массив строк с фото (путь к фото)
     */

    function renderPhotos(photos) {
      var $photosContainer = $card.querySelector('.popup__photos');
      var $templatePhoto = $photosContainer.querySelector('img');
      $templatePhoto.src = photos[0];
      if (photos.length) {
        var $photos = [$templatePhoto];
        for (var i = 1; i < photos.length; i++) {
          var $photo = $templatePhoto.cloneNode(true);
          $photo.src = photos[i];
          $photos.push($photo);
        }
        window.utils.render($photosContainer, $photos, window.Constant.RenderPosition.BEFOREEND);
      } else {
        $photosContainer.removeChild($templatePhoto);
      }
    }

    var $template = document.querySelector('#card').content.querySelector('.map__card');
    var $card = $template.cloneNode(true);
    $card.querySelector('.popup__avatar').src = this._data.author.avatar;
    $card.querySelector('.popup__title').textContent = this._data.offer.title;
    $card.querySelector('.popup__text--address').textContent = this._data.offer.address;
    $card.querySelector('.popup__text--price').textContent = parseInt(this._data.offer.price, 10).toLocaleString() + '₽/ночь';
    $card.querySelector('.popup__type').textContent = window.Constant.bookingTypes[this._data.offer.type];

    $card.querySelector('.popup__text--capacity').textContent = (
      this._data.offer.rooms + ' '
      + window.utils.getWordEnd(this._data.offer.rooms, window.Constant.roomTexts)
      + ' для ' + this._data.offer.guests + ' '
      + window.utils.getWordEnd(this._data.offer.guests, window.Constant.guestTexts)
    );

    $card.querySelector('.popup__text--time').textContent = 'Заезд после ' + this._data.offer.checkin + ', выезд до ' + this._data.offer.checkout;
    // Отрисовка всех доступных удобств в объявлении
    renderFeatures(this._data.offer.features);
    $card.querySelector('.popup__description').textContent = this._data.offer.description;
    // Отрисовка всех фотографий объявления
    renderPhotos(this._data.offer.photos);

    return $card;
  };

  Card.prototype._closeCard = function () {
    this._onCloseCard();
    document.removeEventListener('keydown', this._onKeyDownEsc);
  };

  Card.prototype._onKeyDownEsc = function (evt) {
    var closeCard = this._closeCard;
    if (window.keyboard.isEscPressed(evt)) {
      closeCard();
    }
  };

  Card.prototype.setOnCloseCard = function (onCloseCard) {
    this._onCloseCard = onCloseCard;
    this.getElement().querySelector('.popup__close').addEventListener('click', this._closeCard);
    document.addEventListener('keydown', this._onKeyDownEsc);
  };

  window.Card = Card;
})();
