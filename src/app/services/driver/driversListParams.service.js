(function () {
  'use strict'

  angular.module('taxiManagement')
    .factory('DriversListParams', DriversListParams)

  function DriversListParams() {

    var currentPage = 1;

    var driverStatesChecked = [];

    var filterParams = {
      state_filters: [],
      name: "",
      dni: "",
      phone: "",
      file_number: ""
    };

    return {
      setFilters: function (params) {
        filterParams = params;
        filterParams.dni = params.dni ? params.dni : "";
        filterParams.phone = params.phone ? params.phone : "";
        filterParams.file_number = params.file_number ? params.file_number : "";
      },
      getFilters: function () {
        return filterParams
      },
      setCurrentPage: function (page) {
        currentPage = page
      },
      getCurrentPage: function () {
        return currentPage
      },
      setDriverStatesChecked: function(checked) {
        driverStatesChecked = checked;
      },
      getDriverStatesChecked: function() {
        return driverStatesChecked;
      }
    }
  }
})();
