(function() {
  'use strict';

  angular
    .module('taxiManagement')
    .config(stateConfig);

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state({
        name: 'main',
        url: '/',
        templateUrl: 'app/general/main.view.html',
        controller: 'MainController',
        controllerAs: 'mainController'
      })

    $urlRouterProvider.otherwise('login')
  }

})();
