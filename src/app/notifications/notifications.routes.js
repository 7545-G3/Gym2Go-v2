(function() {
  'use strict';

  angular
    .module('taxiManagement')
    .config(stateConfig);

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state({
        name: 'main.notifications',
        url: 'notifications',
        templateUrl: 'app/notifications/notifications.view.html',
        controller: 'NotificationsController',
        controllerAs: 'vm'
      })


    $urlRouterProvider.otherwise('login')
  }

})();
