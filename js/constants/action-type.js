'use strict';
(function () {
  var ActionType = {
    ACTIVATE_APP: 'ACTIVATE_APP',
    DEACTIVATE_APP: 'DEACTIVATE_APP',
    UPDATE_ORDERS: 'UPDATE_ORDERS',
    RESET_APP: 'INIT',
    UPDATE_FILTERS: 'UPDATE_FILTERS',
    UPDATE_FEATURES: 'UPDATE_FEATURES',
    ORDER_UPLOADED: 'ORDER_UPLOADED',
    ERROR: 'ERROR',
  };

  window.ActionType = ActionType;
})();
