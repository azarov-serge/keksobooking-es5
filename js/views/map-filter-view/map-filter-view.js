'use strict';
(function () {
  var AbsctractView = window.AbsctractView;

  var DEFAULT_INDEX = 0;

  function MapFilterView(args) {
    AbsctractView.call(this);
    this._filter = args.filter;
  }

  MapFilterView.prototype = Object.create(AbsctractView.prototype);
  MapFilterView.prototype.constructor = MapFilterView;


  MapFilterView.prototype._getTemplate = function () {
    var options = '';

    this._filter.options.forEach(function (option, index) {
      options += getOptionTemplate(option, index) + '\n';
    });

    return (
      '<select name="housing-' + this._filter.name + '" ' +
      'id="housing-' + this._filter.name + '" class="map__filter">' +
      options +
      '</select>'
    );
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
