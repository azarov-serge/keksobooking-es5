'use strict';
(function () {
  var MouseButton = {
    LEFT: 0,
  };

  var KeyСode = {
    ESC: 27,
    ENTER: 13,
  };

  function isLeftMouseButtonPressed(evt) {
    return evt.button === MouseButton.LEFT;
  }

  function isEscPressed(evt) {
    return evt.keyCode === KeyСode.ESC;
  }

  function isEnterPressed(evt) {
    return evt.keyCode === KeyСode.ENTER;
  }

  window.eventsUtils = {
    isLeftMouseButtonPressed: isLeftMouseButtonPressed,
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed,
  };
})();
