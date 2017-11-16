(function() {
  'use strict';

  angular
    .module('taxiManagement')
    .config(stateConfig);

  function stateConfig($stateProvider) {
    $stateProvider

      .state({
        name: 'login',
        url: '/login',
        templateUrl: 'app/logReg/login/login.view.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })

      .state({
        name: 'register',
        url: '/register',
        templateUrl: 'app/logReg/register/register.view.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })

      .state({
        name: 'forgot',
        url: '/forgot',
        templateUrl: 'app/logReg/forgot/forgot.view.html',
        controller: 'ForgotController',
        controllerAs: 'vm'
      })

      .state({
        name: 'reset',
        url: '/reset',
        templateUrl: 'app/logReg/reset/reset.view.html',
        controller: 'ResetController',
        controllerAs: 'vm'
      })
  }

})();
