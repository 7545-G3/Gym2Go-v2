(function () {
  'use strict'

  angular.module('taxiManagement')
    .factory('ResetErrorHandler', ResetErrorHandler)

  function ResetErrorHandler() {

    return {

      handleError: function(err) {
        if (err.data.errors[0].hasOwnProperty("code") && err.data.errors[0].code == "Invalid code") {
          return "INVALID_CODE"
        }
      }

    }
  }
})();
