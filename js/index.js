'use strict';
(function () {
  // Import views
  var AppView = window.AppView;
  var PromoView = window.PromoView;

  // Import presenters
  var MapPresenter = window.MapPresenter;

  // Import models
  var AppModel = window.AppModel;
  var OrdersModel = window.OrdersModel;

  // Import utils
  var render = window.DomUtils.render;
  var RenderPosition = window.DomUtils.RenderPosition;

  var appModel = new AppModel();
  var ordersModel = new OrdersModel();

  var rootElement = document.getElementById('root');
  var appView = new AppView();
  var promoView = new PromoView();

  var mapPresenter = new MapPresenter({
    appView: appView,
    promoView: promoView,
    appModel: appModel,
    ordersModel: ordersModel,
  });

  render(rootElement, appView, RenderPosition.BEFORE_END);

  mapPresenter.init();

  render(appView, promoView, RenderPosition.AFTER_BEGIN);

})();
