(function () {
  'use strict'

  angular.module('taxiManagement')
    .factory('SingleDriverErrorHandler', SingleDriverErrorHandler)

  function SingleDriverErrorHandler() {
    return {
      handleError: function(err) {
        if (err.data.errors[0].hasOwnProperty("dni") && err.data.errors[0].dni == "dni must be unique") {
          return "DNI_EXISTS"
        }
      }
    }
  }
})();
