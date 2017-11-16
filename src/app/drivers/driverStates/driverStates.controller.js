(function () {
  'use strict';

  angular
    .module('taxiManagement')
    .controller('DriverStatesController', DriverStatesController)

  function DriverStatesController($scope, $state, State, StateErrorHandler) {
    var vm = this;

    vm.deleteDriverState = deleteDriverState;

    vm.submitState = submitState;

    vm.new_state = {
      code: null,
      references: null
    }

    vm.driverStates = null;
    
    vm.error = null;

    activate();

    function activate() {
      loadStates()
    }

    function submitState() {
      State.create(vm.new_state)
        .then(function (result) {
          console.log(result);
          vm.driverStates.push(result.data);
          resetNewState();
        })
        .catch(function (err) {
          vm.error = SingleDriverErrorHandler.handleError(err);
        })
    }

    function resetNewState() {
      vm.new_state.code = null;
      vm.new_state.references = null;
      vm.error = null;
    }

    function deleteDriverState(driverStateId) {
      State.delete(driverStateId)
        .then(function (result) {
          console.log(result);
          
          vm.error = null;

          vm.driverStates.splice(vm.driverStates.findIndex(function(driverState) {
            return driverState.id == driverStateId
          }), 1)
        })
        .catch(function (err) {
          vm.error = StateErrorHandler.handleError(err);
        });
    }

    function loadStates() {
      State.read()
        .then(function (result) {
          vm.driverStates = result.data
          console.log(result)
        })
        .catch(function (err) {
          console.log(err)
        })
    }

  }


})();
