(function () {
  'use strict'

  angular.module('taxiManagement')
    .factory('Notification', Notification)

  function Notification($http, $q, BASE_URL) {

    return {
      create: function (params) {
        var def = $q.defer()
        $http.post(BASE_URL + '/api/notifications/drivers')
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
        $http.get(BASE_URL + '/api/notifications')
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      delete: function (notificationId) {
        var def = $q.defer()
        $http.delete(BASE_URL + '/api/notifications/' + notificationId)
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      count: function () {
        var def = $q.defer()
        $http.get(BASE_URL + '/api/notifications/count')
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
