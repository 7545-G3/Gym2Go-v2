(function () {
  'use strict'

  angular.module('taxiManagement')
    .factory('StateErrorHandler', StateErrorHandler)

  function StateErrorHandler() {

    return {

      handleError: function(err) {
        if (err.data.errors[0].hasOwnProperty("state_id") && err.data.errors[0].state_id.includes("State already in use")) {
          var auxError = err.data.errors[0].state_id.split(" ");
          return auxError[auxError.length - 1];
        }
      }

    }
  }
})();
