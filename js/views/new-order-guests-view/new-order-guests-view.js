'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;

  // Import utils
  var getSimpleOptionsTemplate = window.templateUtils.getSimpleOptionsTemplate;
  // ----- * -----

  var NOT_GUESTS = 0;
  var MAX_ROOMS_COUNT = 100;

  function NewOrderGuestsView(args) {
    AbsctractView.call(this);

    this._options = args.options;
    this._optionElements = null;
    this._guestsElement = null;
  }

  NewOrderGuestsView.prototype = Object.create(AbsctractView.prototype);
  NewOrderGuestsView.prototype.constructor = NewOrderGuestsView;

  NewOrderGuestsView.prototype.setGuests = function (rooms) {
    this._getGuestsElement().value = getGuestsByRooms(rooms);
    this._disabledGuestsValues(rooms);
  };

  NewOrderGuestsView.prototype._getTemplate = function () {
    return (
      '<fieldset class="ad-form__element">' +
      '<label class="ad-form__label" for="capacity">Количество мест</label>' +
      '<select id="capacity" name="capacity">' +
        getSimpleOptionsTemplate(this._options) +
      '</select>' +
    '</fieldset>'
    );
  };

  NewOrderGuestsView.prototype._getOptionsTemplate = function () {
    var options = '';
    var guestsMap = this._guestsMap;

    Object.keys(guestsMap).forEach(function (value) {
      options += '<option value="' + value + '">' + guestsMap[value] + '</option>';
    });

    return options;
  };

  NewOrderGuestsView.prototype._getGuestsElement = function () {
    if (!this._guestsElement) {
      this._guestsElement = this.getElement().querySelector('#capacity');
    }

    return this._guestsElement;
  };

  NewOrderGuestsView.prototype._getOptonElements = function () {
    if (!this._optionElements) {
      this._optionElements = this.getElement().querySelectorAll('option');
    }

    return this._optionElements;
  };

  NewOrderGuestsView.prototype._disabledGuestsValues = function (rooms) {
    var roomsValue = parseInt(rooms, 10);

    this._getOptonElements().forEach(function (option) {
      var optionValue = parseInt(option.value, 10);
      if (roomsValue === MAX_ROOMS_COUNT) {
        option.disabled = optionValue !== NOT_GUESTS;
      } else {
        option.disabled = !((optionValue <= roomsValue) && (optionValue !== NOT_GUESTS));
      }
    });
  };

  function getGuestsByRooms(rooms) {
    if (rooms === MAX_ROOMS_COUNT.toString()) {
      return NOT_GUESTS.toString();
    }

    return rooms;
  }

  window.NewOrderGuestsView = NewOrderGuestsView;
})();
