(function () {
  'use strict';

  angular
    .module('taxiManagement')
    .controller('LoginController', LoginController);

  function LoginController($state, $localStorage) {
    var vm = this;

    vm.error = null;

    vm.login = login;
    vm.logout = logout;

    function login() {
      $state.go('main.drivers')
    }
    function logout() {
      $state.go('login')
    }

  }

})();
