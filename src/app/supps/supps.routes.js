(function() {
  'use strict';

  angular
    .module('taxiManagement')
    .config(stateConfig);

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state({
        name: 'main.supps',
        url: 'supps',
        templateUrl: 'app/supps/supps.view.html',
        controller: 'SuppsController',
        controllerAs: 'vm'
      })

    $urlRouterProvider.otherwise('login')
  }

})();
