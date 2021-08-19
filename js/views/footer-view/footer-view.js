'use strict';
(function () {
  // Import
  var AbsctractView = window.AbsctractView;
  // ----- * -----

  function FooterView() {
    AbsctractView.call(this);
  }

  FooterView.prototype = Object.create(AbsctractView.prototype);
  FooterView.prototype.constructor = FooterView;

  FooterView.prototype._getTemplate = function () {
    return (
      '<footer class="footer container">' +
        '<div class="footer__copyright copyright">' +
          '<a class="copyright__link copyright__link--image" href="https://htmlacademy.ru/intensive/javascript">' +
            '<img src="img/htmla-logo.svg" width="130" height="45" alt="HTML Academy" class="copyright__logo" />' +
          '</a>' +
          '<p>Сделано в <a class="copyright__link copyright__link--text" href="https://htmlacademy.ru/intensive/javascript">HTMLAcademy</a> © 2018</p>' +
        '</div>' +
        '<ul class="footer__contacts contacts">' +
          '<li><a href="https://twitter.com/htmlacademy_ru" class="contacts__link contacts__link--twitter">Twitter</a></li>' +
          '<li><a href="https://www.instagram.com/htmlacademy/" class="contacts__link contacts__link--instagram">Instagtam</a></li>' +
          '<li><a href="https://www.facebook.com/htmlacademy" class="contacts__link contacts__link--facebook">Facebook</a></li>' +
          '<li><a href="https://vk.com/htmlacademy" class="contacts__link contacts__link--vk">VK</a></li>' +
        '</ul>' +
      '</footer>'
    );
  };

  window.FooterView = FooterView;
})();
