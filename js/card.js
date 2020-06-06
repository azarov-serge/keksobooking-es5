'use strict';
(function () {
  /**
   * @param {Object} $card DOMэлемент карточки товара
   * @param {Object} data JSON с данными
   */

  function renderFeatures($card, data) {
    var $featuresContainer = $card.querySelector('.popup__features');
    var $features = $featuresContainer.querySelectorAll('.popup__feature');
    $features.forEach(function ($feature) {
      var findFeature = $feature.className.split('--');
      if (data.offer.features.indexOf(findFeature[1]) === -1) {
        $featuresContainer.removeChild($feature);
      }
    });
  }

  /**
   * @param {Object} $card DOMэлемент карточки товара
   * @param {Object} data JSON с данными
   */

  function renderPhotos($card, data) {
    var $photosContainer = $card.querySelector('.popup__photos');
    var $templatePhoto = $photosContainer.querySelector('img');
    $templatePhoto.src = data.offer.photos[0];
    if (data.offer.photos.length) {
      var $photos = [$templatePhoto];
      for (var i = 1; i < data.offer.photos.length; i++) {
        var $photo = $templatePhoto.cloneNode(true);
        $photo.src = data.offer.photos[i];
        $photos.push($photo);
      }
      window.utils.render($photosContainer, $photos, window.Constant.RenderPosition.BEFOREEND);
    } else {
      $photosContainer .removeChild($templatePhoto);
    }
  }

  function createCard(data) {
    var $template = document.querySelector('#card').content.querySelector('.map__card');
    var $card = $template.cloneNode(true);
    $card.querySelector('.popup__avatar').src = data.author.avatar;
    $card.querySelector('.popup__title').textContent = data.offer.title;
    $card.querySelector('.popup__text--address').textContent = data.offer.address;
    $card.querySelector('.popup__text--price').textContent = parseInt(data.offer.price, 10).toLocaleString() + '₽/ночь';
    $card.querySelector('.popup__type').textContent = window.Constant.bookingTypes[data.offer.type];

    $card.querySelector('.popup__text--capacity').textContent = (
      data.offer.rooms + ' '
      + window.utils.getWordEnd(data.offer.rooms, window.Constant.roomTexts)
      + ' для ' + data.offer.guests + ' '
      + window.utils.getWordEnd(data.offer.guests, window.Constant.guestTexts)
    );

    $card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    // Отрисовка всех доступных удобств в объявлении
    renderFeatures($card, data);
    $card.querySelector('.popup__description').textContent = data.offer.description;
    // Отрисовка всех фотографий объявления
    renderPhotos($card, data);

    return $card;
  }

  window.createCard = createCard;
})();
