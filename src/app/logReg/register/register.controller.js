(function () {
    'use strict';

    angular
        .module('taxiManagement')
        .controller('RegisterController', RegisterController);

    function RegisterController($state, User, SignupErrorHandler) {

      var vm = this;

      vm.registerCredentials = {
        username: null,
        password: null,
        first_name: null,
        last_name: null,
        email: null
      }

      vm.error = null;

      vm.register = register;

      function register() {
        User.signup(vm.registerCredentials)
          .then(function (result) {
            console.log(result);
            $state.go('login')
          })
          .catch(function (err) {
            vm.error = SignupErrorHandler.handleError(err);
          })
      }
    }

})();
