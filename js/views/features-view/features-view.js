'use strict';
(function () {
  // Import views
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  var type = {
    map: {
      blockId: 'housing-features',
      blockClass: 'map__features',
      checkboxId: 'filter-',
      checkboxClass: 'map__checkbox',
      labelClass: 'map__feature map__feature--',
    },
    newOrder: {
      blockId: '',
      blockClass: 'ad-form__element ad-form__element--wide ',
      checkboxId: 'feature-',
      checkboxClass: 'feature__checkbox',
      labelClass: 'feature feature--',
    },
  };

  function FeaturesView(args) {
    AbsctractView.call(this);
    this._options = args.options;
    this._type = args.type;
    this._featureElements = null;
    this._callback.onChange = args && args.onChange || null;

    this.reset = this.reset.bind(this);
    this._handleChage = this._handleChage.bind(this);

    this._addInnerHandlers();
  }

  FeaturesView.prototype = Object.create(AbsctractView.prototype);
  FeaturesView.prototype.constructor = FeaturesView;

  FeaturesView.prototype.reset = function () {
    this._getFeatureElements()
      .forEach(function (feature) {
        feature.checked = false;
      });
  };

  FeaturesView.prototype._getTemplate = function () {
    var blockId = type[this._type].blockId ?
      'id="' + type[this._type].blockId + '"' :
      '';
    var blockClass = 'class="features ' + type[this._type].blockClass + '"';

    var features = '';

    for (var index = 0; index < this._options.length; index++) {
      features += this._getFeatureTemplate(this._options[index]);
    }

    return (
      '<fieldset ' + blockId + ' ' + blockClass + '>' +
        this._getFeatureLegend() +
        features +
      '</<fieldset>'
    );
  };

  FeaturesView.prototype._getFeatureTemplate = function (feature) {
    var checkboxId = type[this._type].checkboxId + feature.value;

    var checkboxClass = type[this._type].checkboxClass;
    var labelClass = type[this._type].labelClass + feature.value;

    return (
      '<input ' +
        'type="checkbox" ' +
        'name="features" ' +
        'value="' + feature.value + '" ' +
        'id="' + checkboxId + '"' +
        'class="' + checkboxClass + ' visually-hidden" ' +
      '/>\n' +
      '<label ' +
        'class="' + labelClass + '" ' +
        'for="' + checkboxId + '"' +
      '>' +
        feature.title +
      '</label>\n'
    );
  };

  FeaturesView.prototype._getFeatureElements = function () {
    if (!this._fieldsetElements) {
      this._fieldsetElements = this.getElement().querySelectorAll('input');
    }

    return this._fieldsetElements;
  };

  FeaturesView.prototype._getFeatureLegend = function () {
    if (this._type === 'newOrder') {
      return '<legend>Удобства: Wi-Fi, кухня, парковка, стиралка, лифт, кондиционер</legend>';
    }

    return '';
  };

  FeaturesView.prototype._addInnerHandlers = function () {
    if (this._callback.onChange) {
      this.getElement().addEventListener('change', this._handleChage);
    }
  };

  FeaturesView.prototype._removeInnerHandlers = function () {
    if (this._callback.onChange) {
      this.getElement().removeEventListener('change', this._handleChage);
    }
  };

  FeaturesView.prototype._handleChage = function (evt) {
    evt.preventDefault();
    if (this._callback.onChange) {
      var features = [];
      evt.target.parentNode.querySelectorAll('input').forEach(function (input) {
        if (input.checked) {
          features.push(input.value);
        }
      });

      this._callback.onChange(features);
    }
  };

  window.FeaturesView = FeaturesView;
})();
