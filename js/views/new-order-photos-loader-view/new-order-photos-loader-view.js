'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;

  // Import utils
  var render = window.domUtils.render;
  var RenderPosition = window.domUtils.RenderPosition;
  var loadImage = window.imagesUtils.loadImage;
  // ----- * -----

  var PREVIEW_SELECTOR = 'ad-form__photo';

  function NewOrderPhotosLoaderView() {
    AbsctractView.call(this);

    this._imagesElement = null;
    this._previewElement = null;
    this._photoContaiher = null;

    this.reset = this.reset.bind(this);
    this._handleChage = this._handleChage.bind(this);

    this._addInnerHandlers();
  }

  NewOrderPhotosLoaderView.prototype = Object.create(AbsctractView.prototype);
  NewOrderPhotosLoaderView.prototype.constructor = NewOrderPhotosLoaderView;

  NewOrderPhotosLoaderView.prototype.reset = function () {
    var previewsElements = this._getPreviewElements();

    previewsElements.forEach(function (previewElement, index) {
      if (index === 0) {
        previewElement.innerHTML = '';
      } else {
        previewElement.parentElement.removeChild(previewElement);
      }
    });
  };

  NewOrderPhotosLoaderView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form__element ad-form__element--wide">' +
        '<label class="ad-form__label">' +
          'Фотография жилья' +
        '</label>' +
        '<div class="ad-form__photo-container">' +
          '<div class="ad-form__upload">' +
            '<input ' +
              'type="file" ' +
              'id="images" ' +
              'name="images" ' +
              'class="ad-form__input visually-hidden" ' +
              'accept="image/png, image/jpeg" multiple ' +
            '/>' +
            '<label for="images" class="ad-form__drop-zone">' +
              'Загрузить<br>фото...' +
            '</label>' +
          '</div>' +
        '<div class="' + PREVIEW_SELECTOR + '"></div>' +
        '</div>' +
      '</fieldset>'
    );
  };

  NewOrderPhotosLoaderView.prototype._getImagesElement = function () {
    if (!this._imagesElement) {
      this._imagesElement = this.getElement().querySelector('#images');
    }

    return this._imagesElement;
  };

  NewOrderPhotosLoaderView.prototype._getPhotoContaiherElement = function () {
    if (!this._photoContaiher) {
      this._photoContaiher = this.getElement().querySelector('.ad-form__photo-container');
    }

    return this._photoContaiher;
  };

  NewOrderPhotosLoaderView.prototype._getPreviewElement = function () {
    if (!this._previewElement) {
      this._previewElement = this.getElement().querySelector('.' + PREVIEW_SELECTOR);
    }

    return this._previewElement;
  };

  NewOrderPhotosLoaderView.prototype._getPreviewElements = function () {
    return this.getElement().querySelectorAll('.' + PREVIEW_SELECTOR);
  };

  NewOrderPhotosLoaderView.prototype._addInnerHandlers = function () {
    this._getImagesElement().addEventListener('change', this._handleChage);
  };

  NewOrderPhotosLoaderView.prototype._removeInnerHandlers = function () {
    this._getImagesElement().removeEventListener('change', this._handleChage);
  };

  NewOrderPhotosLoaderView.prototype._handleChage = function () {
    var files = this._getImagesElement().files;
    this.reset();
    var photoContainer = this._getPhotoContaiherElement();
    var preview = this._getPreviewElement();


    var previewImage = null;
    Array.from(files).forEach(function (file) {
      if (!preview.querySelector('img')) {
        previewImage = document.createElement('img');
        loadImage(file, previewImage);
        render(preview, previewImage, RenderPosition.BEFORE_END);
      } else {
        preview = preview.cloneNode(true);
        previewImage = preview.querySelector('img');
        loadImage(file, previewImage);
        render(photoContainer, preview, RenderPosition.BEFORE_END);
      }
    });
  };

  window.NewOrderPhotosLoaderView = NewOrderPhotosLoaderView;
})();
