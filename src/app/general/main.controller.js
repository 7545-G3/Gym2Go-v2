(function () {
  'use strict';

  angular
    .module('taxiManagement')
    .controller('MainController', MainController);

  function MainController($state, $location, $localStorage, $scope) {
    var vm = this;

    $scope.$storage = $localStorage;

    vm.logout = logout;

    function logout() {
      $state.go('login');
    }

  }

})();
