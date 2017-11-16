(function () {
  'use strict';

  angular
    .module('taxiManagement')
    .controller('MainController', MainController);

  function MainController($state, User, $location, $localStorage, $scope) {
    var vm = this;

    if (!User.isLogged()) {
      $state.transitionTo('login')
    } else {
      if ($location.path() === '/') {
        $state.transitionTo('main.drivers')
      }
    }

    $scope.$storage = $localStorage;

    vm.logout = logout;
    vm.goToNotifications = goToNotifications;

    function logout() {
      User.logout();
      $state.go('login');
    }

    function goToNotifications() {
      $state.go('main.notifications');
    }

  }

})();
