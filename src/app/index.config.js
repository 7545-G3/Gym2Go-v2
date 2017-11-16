(function() {
  'use strict';

  angular
    .module('taxiManagement')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, $urlRouterProvider, $locationProvider) {
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('spinnerInterceptor');
    $urlRouterProvider.otherwise('/drivers');
    $locationProvider.html5Mode(true);
  }

})();
