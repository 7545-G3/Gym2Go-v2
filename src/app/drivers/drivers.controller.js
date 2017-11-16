(function () {
  'use strict';

  angular
    .module('taxiManagement')
    .controller('DriversController', DriversController)
    .constant('NEXT_TEXT', "Siguiente")
    .constant('PREVIOUS_TEXT', "Anterior")
    .constant('ITEMS_PER_PAGE', 24)
    .constant('DAY_MILISECONDS', 86400000);

  function DriversController($scope, $state, Driver, NEXT_TEXT, PREVIOUS_TEXT, ITEMS_PER_PAGE, DAY_MILISECONDS, DriversListParams, State, Notification, $localStorage) {
    var vm = this;

    vm.totalItems = null;
    vm.itemsPerPage = ITEMS_PER_PAGE;
    vm.currentPage = DriversListParams.getCurrentPage();
    vm.nextText = NEXT_TEXT;
    vm.previousText = PREVIOUS_TEXT;

    vm.driverStates = null;
    vm.driverStatesChecked = DriversListParams.getDriverStatesChecked();

    vm.filterParams = DriversListParams.getFilters();

    $scope.variable = true;
    $scope.$storage = $localStorage.$default({
      lastUpdate: DAY_MILISECONDS
    });

    vm.pageChanged = pageChanged;

    vm.goToCreateDriver = goToCreateDriver;

    vm.goToDriverStates = goToDriverStates;

    vm.editDriver = editDriver;

    vm.deleteDriver = deleteDriver;

    vm.toggleSidebar = toggleSidebar;

    vm.applyFilters = applyFilters;

    activate();

    function goToCreateDriver() {
      $state.go('main.singleDriver', {id: 'new'})
    }

    function goToDriverStates() {
      $state.go('main.driverStates')
    }

    function editDriver(driverId) {
      $state.go('main.singleDriver', {id: driverId})
    }

    function deleteDriver(driverId) {
      Driver.delete(driverId)
        .then(function (result) {
          console.log(result)
        })
        .catch(function (err) {
          console.log("something was wrong")
        });

      vm.drivers.splice(vm.drivers.findIndex(function(driver) {
        return driver.id == driverId
      }), 1)
    }

    function toggleSidebar() {
      $scope.variable = !$scope.variable
    }

    function applyFilters() {
      vm.currentPage = 1;

      DriversListParams.setDriverStatesChecked(vm.driverStatesChecked);
      vm.filterParams.state_filters = setStateFilters();
      DriversListParams.setCurrentPage(vm.currentPage);
      DriversListParams.setFilters(vm.filterParams);
      loadDrivers();
    }

    function activate() {
      console.log("activate");
      loadDrivers()

      State.read()
        .then(function (result) {
          vm.driverStates = result.data
          console.log(result)
        })
        .catch(function (err) {
          console.log(err)
        })

      Notification.count()
        .then(function (result) {
          $localStorage.count = result.data
          console.log(result)
        })
        .catch(function (err) {
          console.log(err)
        })

      if(Date.now() > $localStorage.lastUpdate + DAY_MILISECONDS) {
        Notification.create()
          .then(function (result) {
            $localStorage.lastUpdate = Date.now();
            console.log(result)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }

    function setStateFilters() {
      var states = [];

      for (var i = 0, len = vm.driverStates.length; i < len; i++) {
        if (vm.driverStatesChecked[i]) {
          states.push(vm.driverStates[i].id)
        }
      }

      return Array.from(states);
    }

    function formatted(drivers) {
      function formatDate(date) {
        if (date != null) {
          var auxDate = new Date(date);
          var month = auxDate.getMonth() + 1;
          var year = auxDate.getFullYear();
          var day = auxDate.getDate();
          return month + '/' + day + '/' + year;
        }
      }

      for (var i = 0, len = drivers.length; i < len; i++) {
        drivers[i].contact_date = formatDate(drivers[i].contact_date);
      }

      return drivers
    }

    function loadDrivers() {
      Driver.readWithFilters(DriversListParams.getCurrentPage(), vm.itemsPerPage, DriversListParams.getFilters())
        .then(function (result) {
          console.log(result);
          vm.drivers = formatted(result.data.drivers);
          vm.totalItems = result.data.total_drivers;
        })
        .catch(function (err) {
          console.log('Drivers not loaded')
        })
    }

    function pageChanged() {
      DriversListParams.setCurrentPage(vm.currentPage);
      console.log("pageChanged");
      loadDrivers()
    }
  }

})();
