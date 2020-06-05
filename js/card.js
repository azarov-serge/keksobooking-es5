'use strict';
(function () {
  function createCard(data) {
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var card = template.cloneNode(true);
    card.querySelector('.popup__avatar').src = data.author.avatar;
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').textContent = parseInt(data.offer.price, 10).toLocaleString() + '₽/ночь';
    card.querySelector('.popup__type').textContent = window.Constants.BOOKING_TYPES[data.offer.type];
    card.querySelector('.popup__text--capacity').textContent = (
      data.offer.rooms
      + ' '
      + window.utils.getEndWord(data.offer.rooms, window.Constants.ROOM_TEXTS)
      + ' для ' + data.offer.guests + ' '
      + window.utils.getEndWord(data.offer.guests, window.Constants.GUEST_TEXTS)
    );
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var featuresContainer = card.querySelector('.popup__features');
    var features = featuresContainer.querySelectorAll('.popup__feature');
    features.forEach(function (feature) {
      var findFeature = feature.className.split('--');
      if (data.offer.features.indexOf(findFeature[1]) === -1) {
        featuresContainer.removeChild(feature);
      }
    });

    card.querySelector('.popup__description').textContent = data.offer.description;

    var photosContainer = card.querySelector('.popup__photos');
    var templatePhoto = photosContainer.querySelector('img');

    if (data.offer.photos && data.offer.photos.length > 0) {
      templatePhoto.src = data.offer.photos[0];
      var photos = [templatePhoto];
      if (data.offer.photos.length > 1) {
        for (var i = 1; i < data.offer.photos.length; i++) {
          var photo = templatePhoto.cloneNode(true);
          photo.src = data.offer.photos[i];
          photos.push(photo);
        }
        window.utils.render(photosContainer, photos);
      }
    } else {
      window.utils.remove(templatePhoto);
    }

    return card;
  }

  window.createCard = createCard;
})();
