'use strict';
(function () {
  var FILE_TYPES = ['gif', 'svg', 'jpg', 'jpeg', 'png'];

  function loadImage(file, imgElement) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  window.imagesUtils = {
    loadImage: loadImage,
  };
})();
