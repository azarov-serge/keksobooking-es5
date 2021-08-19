'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;

  // Import utils
  var loadImage = window.imagesUtils.loadImage;

  // Import constatns
  var DEFAULT_AVATAR = window.order.DEFAULT_AVATAR;
  // ----- * -----

  function NewOrderAvatarLoaderView() {
    AbsctractView.call(this);

    this._avatarElement = null;
    this._previewElement = null;

    this.reset = this.reset.bind(this);
    this._handleChage = this._handleChage.bind(this);

    this._addInnerHandlers();
  }

  NewOrderAvatarLoaderView.prototype = Object.create(AbsctractView.prototype);
  NewOrderAvatarLoaderView.prototype.constructor = NewOrderAvatarLoaderView;

  NewOrderAvatarLoaderView.prototype.reset = function () {
    this._getPreviewElement().src = DEFAULT_AVATAR;
  };

  NewOrderAvatarLoaderView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form-header">' +
      '<legend class="ad-form-header__title">Ваша фотография (для карты)</legend>' +
      '<div class="ad-form-header__upload">' +
        '<div class="ad-form-header__preview">' +
          '<img id="avatar-preview" src="' + DEFAULT_AVATAR + '" alt="Аватар пользователя" width="40" height="44" />' +
        '</div>' +
        '<div class="ad-form__field">' +
          '<input type="file" id="avatar" name="avatar" class="ad-form-header__input visually-hidden" accept="image/*">' +
          '<label class="ad-form-header__drop-zone" for="avatar">Загрузить<br>фото...</label>' +
        '</div>' +
        '<p class="ad-form-header__info">' +
          'Заполните все обязательные поля, назначьте цену, загрузите фотографии. ' +
          'Придумайте интересное описание. Оно сделает объявление более живым и привлекательным. ' +
          'Получившееся объявление должно давать гостям полное представление о вашем жилье.' +
        '</p>' +
      '</div>' +
    '</fieldset>'
    );
  };

  NewOrderAvatarLoaderView.prototype._getAvatarElement = function () {
    if (!this._avatarElement) {
      this._avatarElement = this.getElement().querySelector('#avatar');
    }

    return this._avatarElement;
  };

  NewOrderAvatarLoaderView.prototype._getPreviewElement = function () {
    if (!this._previewElement) {
      this._previewElement = this.getElement().querySelector('#avatar-preview');
    }

    return this._previewElement;
  };

  NewOrderAvatarLoaderView.prototype._addInnerHandlers = function () {
    this._getAvatarElement().addEventListener('change', this._handleChage);
  };

  NewOrderAvatarLoaderView.prototype._removeInnerHandlers = function () {
    this._getAvatarElement().removeEventListener('change', this._handleChage);
  };

  NewOrderAvatarLoaderView.prototype._handleChage = function () {
    var file = this._getAvatarElement().files[0];

    loadImage(file, this._getPreviewElement());
  };

  window.NewOrderAvatarLoaderView = NewOrderAvatarLoaderView;
})();
