'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;

  // Import utils
  var getWordEnd = window.TextUtils.getWordEnd;
  var isEscPressed = window.EventsUtils.isEscPressed;

  // Import constatnts
  var DEFAULT_AVATAR = window.offer.DEFAULT_AVATAR;
  var bookingType = window.offer.bookingType;
  // ----- * -----

  var ROOM_TEXTS = ['комната', 'комнаты', 'комнат'];
  var GUEST_TEXTS = ['гостя', 'гостей', 'гостей'];


  function OfferCardView(offer) {
    AbsctractView.call(this);

    this._offer = offer;

    this._handleDocumentKeyDown = this._handleDocumentKeyDown.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);

    this._setInnerHandlers();
  }

  OfferCardView.prototype = Object.create(AbsctractView.prototype);
  OfferCardView.prototype.constructor = OfferCardView;

  OfferCardView.prototype._getTemplate = function () {
    var avatar = this._offer.author.avatar || DEFAULT_AVATAR;
    var address = this._offer.offer.address ? getCardRecord(this._offer.offer.address, 'address') : '';
    var capacity = getCapacity(this._offer.offer.rooms, this._offer.offer.guests);
    var orderTime = getOrderTime(this._offer.offer.checkin, this._offer.offer.checkout);
    var features = getFeatures(this._offer.offer.features);
    var photos = getPhotos(this._offer.offer.photos);

    var title = (
      this._offer.offer.title ?
        '<h3 class="popup__title">' + title + '</h3>' :
        ''
    );

    var price = (
      this._offer.offer.price ?
        getCardRecord(
            this._offer.offer.price.toLocaleString() + '₽/ночь',
            'price'
        ) :
        ''
    );

    var type = (
      this._offer.offer.type ?
        '<h4 class="popup__type">' + bookingType[this._offer.offer.type] + '</h4>' :
        ''
    );

    var description = (
      this._offer.offer.description ?
        '<p class="popup__description"' + description + '</p>' :
        ''
    );

    return (
      '<article class="map__card popup">' +
        '<img ' +
          'src="' + avatar + '" ' +
          'class="popup__avatar" ' +
          'width="70" ' +
          'height="70" ' +
          'alt="Аватар пользователя" ' +
        '/>' +
        '<button type="button" class="popup__close">Закрыть</button>' +
        title +
        address +
        price +
        type +
        capacity +
        orderTime +
        features +
        description +
        photos +
      '</article>'
    );
  };

  OfferCardView.prototype._setInnerHandlers = function () {
    this.getElement().querySelector('.popup__close').addEventListener('click', this._handleCloseButtonClick);
    document.addEventListener('keydown', this._handleDocumentKeyDown);
  };

  OfferCardView.prototype._handleDocumentKeyDown = function (evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();

      this._closeCard();
    }
  };

  OfferCardView.prototype._handleCloseButtonClick = function (evt) {
    evt.preventDefault();
    this._closeCard();
  };

  OfferCardView.prototype._closeCard = function () {
    document.removeEventListener('keydown', this._handleDocumentKeyDown);
    this.getElement().remove();
    this.removeElement();
  };

  function getCardRecord(text, classModifier) {
    return (
      '<p ' +
        'class="popup__text ' +
        'popup__text--' + classModifier + '"' +
      '>' +
        text +
      '</p>');
  }

  function getCapacity(rooms, guests) {
    if (rooms && guests) {
      var roomsText = getWordEnd(rooms, ROOM_TEXTS);
      var guestsText = getWordEnd(guests, GUEST_TEXTS);
      return (
        '<p class="popup__text popup__text--capacity">' +
          rooms + roomsText +
          ' для ' +
          guests + guestsText +
        '</p>'
      );
    }

    return '';
  }

  function getOrderTime(checkin, checkout) {
    return (
      checkin && checkout ? (
        '<p class="popup__text popup__text--time">' +
          'Заезд после ' + checkin +
          ', выезд до ' + checkout +
        '</p>'
      ) :
        ''
    );
  }

  function getFeatures(features) {
    if (features.length) {
      return '';
    }

    var items = '';

    for (var index = 0; index < features.length; index++) {
      items +=
        '<li class="popup__feature popup__feature--' + features[index] + '"></li>';
    }

    return (
      '<ul class="popup__features">' +
        items +
      '</ul>'
    );

  }

  function getPhotos(photos) {
    if (photos.length) {
      return '';
    }

    var items = '';

    for (var index = 0; index < photos.length; index++) {
      items += (
        '<img ' +
          'src=" ' + photos[index] + '" ' +
          'class="popup__photo" ' +
          'width="45" ' +
          'height="40" ' +
          'alt="Фотография жилья" ' +
        '/>'
      );
    }

    return (
      '<div class="popup__photos">' +
        items +
      '</div>'
    );

  }


  window.OfferCardView = OfferCardView;
})();
