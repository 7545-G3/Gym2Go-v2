(function () {
  'use strict'

  angular.module('taxiManagement')
    .factory('Driver', Driver)

  function Driver($http, $q, BASE_URL) {

    return {
      create: function (params) {
        var def = $q.defer()
        $http.post(BASE_URL + '/api/drivers', {
          first_name: params.first_name,
          last_name: params.last_name,
          phone: params.phone,
          dni: params.dni,
          state_id: params.state_id,
          start_working_date: params.start_working_date,
          worked_companies: params.worked_companies,
          layoffs: params.layoffs,
          contact_date: params.contact_date,
          observations: params.observations,
          up_date: params.up_date,
          sacta_expire: params.sacta_expire,
          register_expire: params.register_expire,
          date_of_birth: params.date_of_birth,
          down_date: params.down_date,
          marital_status: params.marital_status,
          medical_coverage: params.medical_coverage,
          alternate_phone_number: params.alternate_phone_number,
          sacta_address: params.sacta_address,
          real_address: params.real_address,
          telegram_sent: params.telegram_sent
        })
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      update: function (params) {
        var def = $q.defer()
        $http.put(BASE_URL + '/api/drivers/' + params.id, {
          first_name: params.first_name,
          last_name: params.last_name,
          phone: params.phone,
          dni: params.dni,
          state_id: params.state_id,
          start_working_date: params.start_working_date,
          worked_companies: params.worked_companies,
          layoffs: params.layoffs,
          contact_date: params.contact_date,
          observations: params.observations,
          up_date: params.up_date,
          sacta_expire: params.sacta_expire,
          register_expire: params.register_expire,
          date_of_birth: params.date_of_birth,
          down_date: params.down_date,
          marital_status: params.marital_status,
          medical_coverage: params.medical_coverage,
          alternate_phone_number: params.alternate_phone_number,
          sacta_address: params.sacta_address,
          real_address: params.real_address,
          telegram_sent: params.telegram_sent
        })
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      getDriver: function (params) {
        var def = $q.defer()
        $http.get(BASE_URL + '/api/drivers/' + params.id)
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      read: function (currentPage, itemsPerPage) {
        var def = $q.defer()
        $http.get(BASE_URL + '/api/drivers?pageNumber=' + currentPage + '&itemsPerPage=' + itemsPerPage)
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      delete: function (driverId) {
        var def = $q.defer()
        $http.delete(BASE_URL + '/api/drivers/' + driverId)
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      readWithFilters: function (currentPage, itemsPerPage, params) {
        var def = $q.defer()
        $http.post(BASE_URL + '/api/drivers/filter?pageNumber=' + currentPage + '&itemsPerPage=' + itemsPerPage
          + '&name=' + params.name.replace(" ", "%20")
          + '&dni=' + params.dni + '&phone=' + params.phone + '&fileNumber=' + params.file_number, {
          state_filters: params.state_filters
        })
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      }
    }
  }
})();
