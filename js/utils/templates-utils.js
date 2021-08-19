'use strict';
(function () {
  function getSimpleOptionsTemplate(options) {
    var optionsTemplate = '';

    options.forEach(function (option) {
      optionsTemplate += '<option value="' + option.value + '">' + option.title + '</option>';
    });

    return optionsTemplate;
  }

  window.templateUtils = {
    getSimpleOptionsTemplate: getSimpleOptionsTemplate,
  };
})();
