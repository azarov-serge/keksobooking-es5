'use strict';
(function () {
  // Import views
  var AppView = window.AppView;
  var PromoView = window.PromoView;
  var FooterView = window.FooterView;

  // Import presenters
  var MapPresenter = window.MapPresenter;
  var NewOrderPresenter = window.NewOrderPresenter;

  // Import models
  var AppModel = window.AppModel;
  var OrdersModel = window.OrdersModel;
  var FiltersModel = window.FiltersModel;

  // Import utils
  var render = window.domUtils.render;
  var RenderPosition = window.domUtils.RenderPosition;
  // ----- * -----

  var appModel = new AppModel();
  var ordersModel = new OrdersModel();
  var filtersModel = new FiltersModel();

  var rootElement = document.getElementById('root');
  var appView = new AppView();
  var promoView = new PromoView();
  var footerView = new FooterView();

  var mapPresenter = new MapPresenter({
    appView: appView,
    promoView: promoView,
    appModel: appModel,
    ordersModel: ordersModel,
    filtersModel: filtersModel,
  });

  var newOrderPresenter = new NewOrderPresenter({
    appView: appView,
    appModel: appModel,
    ordersModel: ordersModel,
  });

  render(rootElement, appView, RenderPosition.BEFORE_END);

  // Render map and start presenter
  mapPresenter.init();
  // Render new order section and start presenter
  newOrderPresenter.init();

  render(appView, promoView, RenderPosition.AFTER_BEGIN);
  render(appView, footerView, RenderPosition.BEFORE_END);
})();
