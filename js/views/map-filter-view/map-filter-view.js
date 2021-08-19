'use strict';
(function () {
  // Import views
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  var DEFAULT_INDEX = 0;

  function MapFilterView(args) {
    AbsctractView.call(this);
    this._filter = args.filter;
    this._optionElements = null;
    this._callback.onChange = args.onChange;

    this.reset = this.reset.bind(this);
    this._handleChage = this._handleChage.bind(this);

    this._addInnerHandlers();
  }

  MapFilterView.prototype = Object.create(AbsctractView.prototype);
  MapFilterView.prototype.constructor = MapFilterView;

  MapFilterView.prototype.reset = function () {
    this._getOptions()[0].selected = true;
  };


  MapFilterView.prototype._getTemplate = function () {
    var options = '';

    this._filter.options.forEach(function (option, index) {
      options += getOptionTemplate(option, index) + '\n';
    });

    return (
      '<select name="housing-' + this._filter.name + '" ' +
        'id="housing-' + this._filter.name + '" ' +
        'class="map__filter"' +
        'data-type="' + this._filter.name + '" ' +
      '>' +
        options +
      '</select>'
    );
  };

  MapFilterView.prototype._getOptions = function () {
    if (!this._optionElements) {
      this._optionElements = this.getElement().querySelectorAll('option');
    }

    return this._optionElements;
  };

  MapFilterView.prototype._addInnerHandlers = function () {
    if (this._callback.onChange) {
      this.getElement().addEventListener('change', this._handleChage);
    }
  };

  MapFilterView.prototype._removeInnerHandlers = function () {
    if (this._callback.onChange) {
      this.getElement().removeEventListener('change', this._handleChage);
    }
  };

  MapFilterView.prototype._handleChage = function (evt) {
    evt.preventDefault();
    var value = '';
    evt.target.querySelectorAll('option').forEach(function (option) {
      if (option.selected) {
        value = option.value;
        return;
      }
    });

    var result = {
      type: this._filter.name,
      value: value,
    };

    this._callback.onChange(result);
  };


  function getOptionTemplate(option, index) {
    var selected = index === DEFAULT_INDEX ? 'selected' : '';

    return (
      '<option value="' + option.value + '"' + selected + '>' +
        option.title +
      '</option>'
    );
  }

  window.MapFilterView = MapFilterView;
})();
