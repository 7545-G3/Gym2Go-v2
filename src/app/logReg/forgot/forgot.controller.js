(function () {
  'use strict';

  angular
    .module('taxiManagement')
    .controller('ForgotController', ForgotController);

  function ForgotController($state, User) {

    var vm = this;

    vm.email = null;

    vm.forgot = forgot;

    function forgot() {
      User.forgot(vm.email)
        .then(function (result) {
          $state.go('reset')
        })
        .catch(function (err) {
        })
    }
  }

})();
