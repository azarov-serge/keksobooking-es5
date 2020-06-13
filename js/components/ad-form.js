'use strict';
(function () {
  var AdFormClass = {
    AD_FORM: '.ad-form',
    TOGGLE_CLASS: 'ad-form--disabled',
    AD_TITLE: '#title',
    AD_ADDRESS: '#address',
    AD_ROOMS: '#room_number',
    AD_GUESTS: '#capacity',
    FIELDSET: 'fieldset',
  };

  function AdForm() {
    window.AbsctractElement.call(this);
    this._SELECTOR = AdFormClass.AD_FORM;
    this._TOGGLE_CLASS = AdFormClass.TOGGLE_CLASS;
    this._$adTitle = null;
    this._$adAddress = null;
    this._$adRooms = null;
    this._$adGuests = null;
    this._$fieldsets = null;
  }

  AdForm.prototype = Object.create(window.AbsctractElement.prototype);
  AdForm.prototype.constructor = AdForm;

  AdForm.prototype.getAdTitle = function () {
    return this.getCustomElement(this._$adTitle, AdFormClass.AD_TITLE, this.getElement());
  };

  AdForm.prototype.getAdAddress = function () {
    return this.getCustomElement(this._$adAddress, AdFormClass.AD_ADDRESS, this.getElement());
  };

  AdForm.prototype.getAdRooms = function () {
    return this.getCustomElement(this._$adRooms, AdFormClass.AD_ROOMS, this.getElement());
  };

  AdForm.prototype.getAdGuests = function () {
    return this.getCustomElement(this._$adGuests, AdFormClass.AD_GUESTS, this.getElement());
  };

  AdForm.prototype._getFieldsets = function () {
    if (!this._$fieldsets) {
      this._$fieldsets = this.getElement().querySelectorAll(AdFormClass.FIELDSET);
    }

    return this._$fieldsets;
  };

  AdForm.prototype.toggleStateFieldsets = function () {
    this._getFieldsets().forEach(function ($fieldset) {
      $fieldset.disabled = !$fieldset.disabled;
    });
  };

  AdForm.prototype.toggleStateCallback = function () {
    this.toggleStateFieldsets();
  };

  AdForm.prototype.isActivateFieldsets = function () {
    return !this._getFieldsets()[0].disabled;
  };

  AdForm.prototype.setAddress = function (coords) {
    window.coords.convertToLocation(coords);
    this.getAdAddress().value = coords.x + ', ' + coords.y;
  };


  AdForm.prototype.setOnChangeAdRooms = function (onChangeAdRooms) {
    this.getAdRooms().addEventListener('change', onChangeAdRooms);
  };

  AdForm.prototype.setOnSubmitAdForm = function (onSubmitAdForm) {
    this.getElement().addEventListener('submit', onSubmitAdForm);
  };

  window.AdForm = AdForm;
})();
