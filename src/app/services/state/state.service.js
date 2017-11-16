(function () {
  'use strict'

  angular.module('taxiManagement')
    .factory('State', State)

  function State($http, $q, BASE_URL) {

    return {
      create: function (params) {
        var def = $q.defer()
        $http.post(BASE_URL + '/api/states', {
            code: params.code,
            references: params.references
          })
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },

      read: function () {
        var def = $q.defer()
        $http.get(BASE_URL + '/api/states')
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },

      readSingle: function (stateId) {
        var def = $q.defer()
        $http.get(BASE_URL + '/api/states/' + stateId)
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },

      delete: function (stateId) {
        var def = $q.defer()
        $http.delete(BASE_URL + '/api/states/' + stateId)
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
