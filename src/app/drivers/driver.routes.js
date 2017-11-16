(function() {
  'use strict';

  angular
    .module('taxiManagement')
    .config(stateConfig);

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state({
        name: 'main.drivers',
        url: 'drivers',
        templateUrl: 'app/drivers/drivers.view.html',
        controller: 'DriversController',
        controllerAs: 'vm'
      })

      .state({
        name: 'main.singleDriver',
        url: 'drivers/{id}',
        templateUrl: 'app/drivers/singleDriver/singleDriver.view.html',
        controller: 'SingleDriverController',
        controllerAs: 'vm'
      })

      .state({
        name: 'main.driverStates',
        url: 'driverStates',
        templateUrl: 'app/drivers/driverStates/driverStates.view.html',
        controller: 'DriverStatesController',
        controllerAs: 'vm'
      })
    $urlRouterProvider.otherwise('login')
  }

})();
