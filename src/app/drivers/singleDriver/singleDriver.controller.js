(function () {
  'use strict';

  angular
    .module('taxiManagement')
    .controller('SingleDriverController', SingleDriverController);

  function SingleDriverController($state, Driver, $stateParams, $q, SingleDriverErrorHandler, State) {
    var vm = this;

    vm.new_driver = {
      first_name: null,
      last_name: null,
      phone: null,
      dni: null,
      state_id: null,
      start_working_date: null,
      worked_companies: null,
      layoffs: null,
      contact_date: null,
      observations: null,
      up_date: null,
      sacta_expire: null,
      register_expire: null,
      date_of_birth: null,
      down_date: null,
      marital_status: null,
      medical_coverage: null,
      alternate_phone_number: null,
      sacta_address: null,
      real_address: null,
      telegram_sent: false,
      file_number: null
    };

    vm.driverStates = null;

    vm.error = null;

    vm.viewOptions = viewOptions;

    vm.submitDriver = submitDriver;

    vm.getEmployeeStateId = getEmployeeStateId;

    vm.driverAge = driverAge;

    vm.functionToApply = Driver.create;

    activate();

    function activate() {
      if ($stateParams.id !== 'new') {
        $q.all([
          State.read(),
          Driver.getDriver($stateParams)
        ])
          .then(function (responses) {
            vm.driverStates = responses[0].data;
            vm.new_driver = formatIn(responses[1].data);

            console.log(responses[0]);
            console.log(responses[1]);
          })
          .catch(function (err) {
            console.log(err)
          })
      } else {
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

    function formatIn(driver) {
      function formatStartWorkingDate(driver) {
        if (driver.start_working_date !== null) {
          var date = new Date(driver.start_working_date);
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          driver.start_working_date = month + '/' + year;
        }
      }

      function formatDate(date) {
        if (date !== null) {
          var auxDate = new Date(date);
          var month = auxDate.getMonth() + 1;
          var year = auxDate.getFullYear();
          var day = auxDate.getDate();
          return month + '/' + day + '/' + year;
        }
      }

      formatStartWorkingDate(driver);
      driver.contact_date = formatDate(driver.contact_date);
      driver.up_date = formatDate(driver.up_date);
      driver.sacta_expire = formatDate(driver.sacta_expire);
      driver.register_expire = formatDate(driver.register_expire);
      driver.date_of_birth = formatDate(driver.date_of_birth);
      driver.down_date = formatDate(driver.down_date);

      driver.phone = parseInt(driver.phone);
      driver.dni = parseInt(driver.dni);
      driver.state_id = parseInt(driver.state_id);

      return driver
    }

    function formatOut(driver) {
      var data = {};
      angular.copy(driver, data);
      function formatStartWorkingDate(data) {
        if (data.start_working_date !== null) {
          var splitDate = data.start_working_date.split("/");
          data.start_working_date =  splitDate[0] + '/1/' + splitDate[1];
        }
      }

      formatStartWorkingDate(data);
      data.contact_date = data.contact_date ? new Date(data.contact_date) : null
      data.up_date = data.up_date ? new Date(data.up_date) : null
      data.sacta_expire = data.sacta_expire ? new Date(data.sacta_expire) : null
      data.register_expire = data.register_expire ? new Date(data.register_expire) : null
      data.date_of_birth = data.date_of_birth ? new Date(data.date_of_birth) : null
      data.down_date = data.down_date ? new Date(data.down_date) : null
      data.start_working_date = data.start_working_date ? new Date(data.start_working_date) : null

      return data
    }

    function submitDriver() {
      if ($stateParams.id !== 'new') {
        vm.functionToApply = Driver.update
      }

      console.log(vm.new_driver)
      vm.functionToApply(formatOut(vm.new_driver))
        .then(function (result) {
          console.log(result);
          $state.go('main.drivers')
        })
        .catch(function (err) {
          vm.error = SingleDriverErrorHandler.handleError(err);
        })
    }

    function viewOptions() {
      var options = {
        'edit': {
          'title': 'Editar chofer',
          'button': 'Guardar'
        },
        'new': {
          'title': 'Agregar nuevo chofer',
          'button': 'Agregar'
        }
      }

      if ($stateParams.id !== 'new') {
        return options['edit']
      }

      return options[$stateParams.id]

    }

    function getEmployeeStateId() {
      function isEmployee(state) {
        return state.code === "EM"
      }

      return vm.driverStates[vm.driverStates.findIndex(isEmployee)].id
    }

    function driverAge() {
      if (vm.new_driver.date_of_birth) {
        var date_of_birth = new Date(vm.new_driver.date_of_birth);
        var now = new Date();

        var age = now.getFullYear() - date_of_birth.getFullYear();

        if (now.getMonth() < date_of_birth.getMonth()) {
          age = age - 1;
        }

        return age
      }
    }
  }
})();
