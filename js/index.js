'use strict';
(function () {
  // Import views
  var AppView = window.AppView;
  var PromoView = window.PromoView;

  // Import utils
  var render = window.DomUtils.render;
  var RenderPosition = window.DomUtils.RenderPosition;

  var rootElement = document.getElementById('root');
  var appView = new AppView();
  var promoView = new PromoView();

  render(rootElement, appView, RenderPosition.BEFORE_END);
  render(appView, promoView, RenderPosition.BEFORE_END);

})();
