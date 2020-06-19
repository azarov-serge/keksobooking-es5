'use strict';
(function () {
  var AbsctractElement = window.AbsctractElement;

  var AdFormClass = {
    AD_FORM: '.ad-form',
    TOGGLE_CLASS: 'ad-form--disabled',
    AD_TITLE: '#title',
    AD_AFATAR: '#avatar',
    AD_ADDRESS: '#address',
    AD_ROOM: '#room_number',
    AD_GUEST: '#capacity',
    AD_IMAGE: '#images',
    AD_PRICE: '#price',
    AD_TYPE: '#type',
    AD_CHECK_IN: '#timein',
    AD_CHECK_OUT: '#timeout',
    AD_DESCRIPTION: '#description',
    FIELDSET: 'fieldset',
  };

  function AdFormComponent() {
    AbsctractElement.call(this);
    this._SELECTOR = AdFormClass.AD_FORM;
    this._TOGGLE_CLASS = AdFormClass.TOGGLE_CLASS;
    this._$adTitle = null;
    this._$adAvatar = null;
    this._$adAddress = null;
    this._$adRoom = null;
    this._$adGuest = null;
    this._$adImage = null;
    this._$adPrice = null;
    this._$adType = null;
    this._$adCheckIn = null;
    this._$adCheckOut = null;
    this._$fieldsets = null;
  }

  AdFormComponent.prototype = Object.create(AbsctractElement.prototype);
  AdFormComponent.prototype.constructor = AdFormComponent;

  AdFormComponent.prototype.getAdTitle = function () {
    return this.getCustomElement(this._$adTitle, AdFormClass.AD_TITLE, this.getElement());
  };

  AdFormComponent.prototype.getAdAvatar = function () {
    return this.getCustomElement(this._$adAvatar, AdFormClass.AD_AFATAR, this.getElement());
  };

  AdFormComponent.prototype.getAdAddress = function () {
    return this.getCustomElement(this._$adAddress, AdFormClass.AD_ADDRESS, this.getElement());
  };

  AdFormComponent.prototype.getAdRooms = function () {
    return this.getCustomElement(this._$adRoom, AdFormClass.AD_ROOM, this.getElement());
  };

  AdFormComponent.prototype.getAdGuests = function () {
    return this.getCustomElement(this._$adGuest, AdFormClass.AD_GUEST, this.getElement());
  };

  AdFormComponent.prototype.getAdImages = function () {
    return this.getCustomElement(this._$adImage, AdFormClass.AD_IMAGE, this.getElement());
  };

  AdFormComponent.prototype.getAdPrice = function () {
    return this.getCustomElement(this._$adPrice, AdFormClass.AD_PRICE, this.getElement());
  };

  AdFormComponent.prototype.getAdType = function () {
    return this.getCustomElement(this._$adType, AdFormClass.AD_TYPE, this.getElement());
  };

  AdFormComponent.prototype.getAdCheckIn = function () {
    return this.getCustomElement(this._$adCheckIn, AdFormClass.AD_CHECK_IN, this.getElement());
  };

  AdFormComponent.prototype.getAdCheckOut = function () {
    return this.getCustomElement(this._$adCheckOut, AdFormClass.AD_CHECK_OUT, this.getElement());
  };

  AdFormComponent.prototype.getAdDescription = function () {
    return this.getCustomElement(this._$adCheckOut, AdFormClass.AD_DESCRIPTION, this.getElement());
  };

  AdFormComponent.prototype._getFieldsets = function () {
    return this.getCustomElements(this._$fieldsets, AdFormClass.FIELDSET, this.getElement());
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

  AdFormComponent.prototype.setAdRoomsChangeHandler = function (adRoomsChangeHandler) {
    this.getAdRooms().addEventListener('change', adRoomsChangeHandler);
  };

  AdFormComponent.prototype.setAdTypeChangeHandler = function (adTypeChangeHandler) {
    this.getAdType().addEventListener('change', adTypeChangeHandler);
  };

  AdFormComponent.prototype.setAdCheckInChangeHandler = function (adCheckInChangeHandler) {
    this.getAdCheckIn().addEventListener('change', adCheckInChangeHandler);
  };

  AdFormComponent.prototype.setAdCheckOutChangeHandler = function (adCheckOutChangeHandler) {
    this.getAdCheckOut().addEventListener('change', adCheckOutChangeHandler);
  };

  AdFormComponent.prototype.setAdFormSubmitHandler = function (adFormSubmitHandler) {
    this.getElement().addEventListener('submit', adFormSubmitHandler);
  };

  window.AdFormComponent = AdFormComponent;
})();
