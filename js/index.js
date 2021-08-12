'use strict';
(function () {
  // Import views
  var AppView = window.AppView;
  var PromoView = window.PromoView;

  // Import presenters
  var MapPresenter = window.MapPresenter;

  // Import models
  var AppModel = window.AppModel;

  // Import utils
  var render = window.DomUtils.render;
  var RenderPosition = window.DomUtils.RenderPosition;

  var appModel = new AppModel();

  var rootElement = document.getElementById('root');
  var appView = new AppView();
  var promoView = new PromoView();

  var mapPresenter = new MapPresenter({
    appView: appView,
    promoView: promoView,
    appModel: appModel,
  });

  render(rootElement, appView, RenderPosition.BEFORE_END);

  mapPresenter.init();

  render(appView, promoView, RenderPosition.AFTER_BEGIN);

})();
