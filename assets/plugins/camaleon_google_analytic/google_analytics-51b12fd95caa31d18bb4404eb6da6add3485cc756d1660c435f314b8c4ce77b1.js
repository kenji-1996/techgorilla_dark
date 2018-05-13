(function() {
  this.GoogleAnalytics = (function() {
    function GoogleAnalytics() {}

    GoogleAnalytics.load = function() {
      var firstScript, googleScript;
      window['GoogleAnalyticsObject'] = 'ga';
      window['ga'] = window['ga'] || function() {
        return (window['ga'].q = window['ga'].q || []).push(arguments);
      };
      window['ga'].l = 1 * new Date();
      googleScript = document.createElement("script");
      googleScript.async = 1;
      googleScript.src = '//www.google-analytics.com/analytics.js';
      firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(googleScript, firstScript);
      ga('create', GoogleAnalytics.analyticsId(), 'auto');
      if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
        document.addEventListener("page:change", GoogleAnalytics.trackPageview, true);
        return document.addEventListener("turbolinks:load", GoogleAnalytics.trackPageview, true);
      } else {
        return GoogleAnalytics.trackPageview();
      }
    };

    GoogleAnalytics.trackPageview = function(url) {
      if (!GoogleAnalytics.isLocalRequest()) {
        if (url) {
          return ga('send', 'pageview', url);
        } else {
          return ga('send', 'pageview');
        }
      }
    };

    GoogleAnalytics.isLocalRequest = function() {
      return document.domain.indexOf('dev') !== -1;
    };

    GoogleAnalytics.analyticsId = function() {
      return window.GAID;
    };

    return GoogleAnalytics;

  })();

  GoogleAnalytics.load();

}).call(this);
