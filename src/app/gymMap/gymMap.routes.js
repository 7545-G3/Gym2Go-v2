(function() {
  'use strict';

  angular
    .module('taxiManagement')
    .config(stateConfig);

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state({
        name: 'main.gymMap',
        url: 'gymMap',
        templateUrl: 'app/gymMap/gymMap.view.html',
        controller: 'GymMapController',
        controllerAs: 'vm'
      })

    $urlRouterProvider.otherwise('login')
  }

})();
