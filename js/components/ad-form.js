'use strict';
(function () {
  var AbsctractElement = window.AbsctractElement;

  var AdFormSelector = {
    AD_FORM: '.ad-form',
    TOGGLE_CLASS: 'ad-form--disabled',
    AD_TITLE: '#title',
    AD_AVATAR: '#avatar',
    AD_AVATAR_PREVIEW: '.ad-form-header__preview',
    AD_ADDRESS: '#address',
    AD_ROOM: '#room_number',
    AD_GUEST: '#capacity',
    AD_IMAGES_CONTAINER: '.ad-form__photo-container',
    AD_IMAGES: '#images',
    AD_IMAGES_PREVIEW: '.ad-form__photo',
    AD_PRICE: '#price',
    AD_TYPE: '#type',
    AD_CHECK_IN: '#timein',
    AD_CHECK_OUT: '#timeout',
    AD_DESCRIPTION: '#description',
    AD_RESET_BTN: '.ad-form__reset',
    AD_FEATURE: '.feature__checkbox',
    FIELDSET: 'fieldset',
  };

  function AdFormComponent() {
    AbsctractElement.call(this);
    this._SELECTOR = AdFormSelector.AD_FORM;
    this._TOGGLE_CLASS = AdFormSelector.TOGGLE_CLASS;
    this._$adTitle = null;
    this._$adAvatar = null;
    this._$adAvatarPreview = null;
    this._$adAddress = null;
    this._$adRoomsValue = null;
    this._$adGuestsValue = null;
    this._$adImagesContainer = null;
    this._$adImagesItem = null;
    this._$adImagesPreview = null;
    this._$adPrice = null;
    this._$adType = null;
    this._$adCheckIn = null;
    this._$adCheckOut = null;
    this._$adResetBtn = null;
    this._$features = null;
    this._$fieldsets = null;
    this.adRoomsChangeHandler = null;
    this.adTypeChangeHandler = null;
    this.adCheckInChangeHandler = null;
    this.adCheckOutChangeHandler = null;
    this.adFormSubmitHandler = null;
    this.adFormResetHandler = null;
    this.adAvatarChangeHandler = null;
    this.adAdImagesChangeHandler = null;
  }

  AdFormComponent.prototype = Object.create(AbsctractElement.prototype);
  AdFormComponent.prototype.constructor = AdFormComponent;

  AdFormComponent.prototype.getAdTitle = function () {
    return this._getCustomElement(this._$adTitle, AdFormSelector.AD_TITLE, this.getElement());
  };

  AdFormComponent.prototype.getAdAvatar = function () {
    return this._getCustomElement(this._$adAvatar, AdFormSelector.AD_AVATAR, this.getElement());
  };

  AdFormComponent.prototype.getAdAvatarPreview = function () {
    return this._getCustomElement(this._$adAvatarPreview, AdFormSelector.AD_AVATAR_PREVIEW, this.getElement());
  };

  AdFormComponent.prototype.getAdAddress = function () {
    return this._getCustomElement(this._$adAddress, AdFormSelector.AD_ADDRESS, this.getElement());
  };

  AdFormComponent.prototype.getAdRooms = function () {
    return this._getCustomElement(this._$adRoomsValue, AdFormSelector.AD_ROOM, this.getElement());
  };

  AdFormComponent.prototype.getAdGuests = function () {
    return this._getCustomElement(this._$adGuestsValue, AdFormSelector.AD_GUEST, this.getElement());
  };

  AdFormComponent.prototype.getAdImagesContainer = function () {
    return this._getCustomElement(this._$adImagesContainer, AdFormSelector.AD_IMAGES_CONTAINER, this.getElement());
  };

  AdFormComponent.prototype.getAdImages = function () {
    return this._getCustomElement(this._$adImagesItem, AdFormSelector.AD_IMAGES, this.getElement());
  };

  AdFormComponent.prototype.getAdImagesPreview = function () {
    return this._getCustomElement(this._$adImagesPreview, AdFormSelector.AD_IMAGES_PREVIEW, this.getElement());
  };

  AdFormComponent.prototype.getAdPrice = function () {
    return this._getCustomElement(this._$adPrice, AdFormSelector.AD_PRICE, this.getElement());
  };

  AdFormComponent.prototype.getAdType = function () {
    return this._getCustomElement(this._$adType, AdFormSelector.AD_TYPE, this.getElement());
  };

  AdFormComponent.prototype.getAdCheckIn = function () {
    return this._getCustomElement(this._$adCheckIn, AdFormSelector.AD_CHECK_IN, this.getElement());
  };

  AdFormComponent.prototype.getAdCheckOut = function () {
    return this._getCustomElement(this._$adCheckOut, AdFormSelector.AD_CHECK_OUT, this.getElement());
  };

  AdFormComponent.prototype.getAdDescription = function () {
    return this._getCustomElement(this._$adCheckOut, AdFormSelector.AD_DESCRIPTION, this.getElement());
  };

  AdFormComponent.prototype.getAdResetBtn = function () {
    return this._getCustomElement(this._$adResetBtn, AdFormSelector.AD_RESET_BTN, this.getElement());
  };

  AdFormComponent.prototype._getFeatures = function () {
    return this._getCustomElements(this._$features, AdFormSelector.AD_FEATURE, this.getElement());
  };

  AdFormComponent.prototype._getFieldsets = function () {
    return this._getCustomElements(this._$fieldsets, AdFormSelector.FIELDSET, this.getElement());
  };

  AdFormComponent.prototype.toggleStateFieldsets = function () {
    this._getFieldsets().forEach(function ($fieldset) {
      $fieldset.disabled = !$fieldset.disabled;
    });
  };

  AdFormComponent.prototype.toggleStateCallback = function () {
    this.toggleStateFieldsets();
  };

  AdFormComponent.prototype.isActivateFieldsets = function () {
    return !this._getFieldsets()[0].disabled;
  };

  AdFormComponent.prototype.addAdFormValidityListeners = function () {
    this.getAdRooms().addEventListener('change', this.adRoomsChangeHandler);
    this.getAdType().addEventListener('change', this.adTypeChangeHandler);
    this.getAdCheckIn().addEventListener('change', this.adCheckInChangeHandler);
    this.getAdCheckOut().addEventListener('change', this.adCheckOutChangeHandler);
  };

  AdFormComponent.prototype.removeAdFormValidityListeners = function () {
    this.getAdRooms().removeEventListener('change', this.adRoomsChangeHandler);
    this.getAdType().removeEventListener('change', this.adTypeChangeHandler);
    this.getAdCheckIn().removeEventListener('change', this.adCheckInChangeHandler);
    this.getAdCheckOut().removeEventListener('change', this.adCheckOutChangeHandler);
  };

  AdFormComponent.prototype.addAdFormSubmitListener = function () {
    this.getElement().addEventListener('submit', this.adFormSubmitHandler);
  };

  AdFormComponent.prototype.removeAdFormSubmitListener = function () {
    this.getElement().removeEventListener('submit', this.adFormSubmitHandler);
  };


  AdFormComponent.prototype.addAdFormResetListener = function () {
    this.getAdResetBtn().addEventListener('click', this.adFormResetHandler);
  };

  AdFormComponent.prototype.removeAdFormResetListener = function () {
    this.getAdResetBtn().removeEventListener('click', this.adFormResetHandler);
  };

  AdFormComponent.prototype.addAdAvatarListener = function () {
    this.getAdAvatar().addEventListener('change', this.adAvatarChangeHandler);
  };

  AdFormComponent.prototype.removeAdAvatarListener = function () {
    this.getAdAvatar().removeEventListener('change', this.adAvatarChangeHandler);
  };


  AdFormComponent.prototype.addAdImagesListener = function () {
    this.getAdImages().addEventListener('change', this.adAdImagesChangeHandler);
  };

  AdFormComponent.prototype.removeAdImagesListener = function () {
    this.getAdImages().removeEventListener('change', this.adAdImagesChangeHandler);
  };

  window.AdFormComponent = AdFormComponent;
})();
