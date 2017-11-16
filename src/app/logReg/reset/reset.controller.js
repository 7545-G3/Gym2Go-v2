(function () {
  'use strict';

  angular
    .module('taxiManagement')
    .controller('ResetController', ResetController);

  function ResetController($state, User, ResetErrorHandler) {

    var vm = this;

    vm.resetParams = {
      code: null,
      password: null
    }

    vm.error = null;

    vm.reset = reset;

    function reset() {
      User.reset(vm.resetParams)
        .then(function (result) {
          console.log(result)
          $state.go('login')
        })
        .catch(function (err) {
          vm.error = ResetErrorHandler.handleError(err)
        })
    }
  }

})();
