(function () {
  'use strict'

  angular.module('taxiManagement')
    .factory('User', User)

  function User($http, $q, $localStorage, BASE_URL) {
    var updateApiTokenHeader = function (token) {
      if (token) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + token
      } else {
        $http.defaults.headers.common.Authorization = undefined
      }
    }

    return {
      login: function (params) {
        var def = $q.defer()
        $http.post(BASE_URL + '/api/users/login', {
          username: params.username,
          password: params.password
        })
          .then(function (res) {
            $localStorage.api_token = res.data.api_token
            $localStorage.lastUser = res.data.username
            updateApiTokenHeader(res.data.api_token)
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      signup: function (params) {
        var def = $q.defer()
        $http.post(BASE_URL + '/api/users', {
            username: params.username,
            password: params.password,
            first_name: params.first_name,
            last_name: params.last_name,
            email: params.email
          })
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      isLogged: function () {
        var token = $localStorage.api_token
        updateApiTokenHeader(token)
        return !(!$localStorage.api_token)
      },
      logout: function () {
        $localStorage.$reset()
      },
      forgot: function(email) {
        var def = $q.defer()
        $http.post(BASE_URL + '/api/users/password-reset-code', {
            email: email
          })
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      reset: function(params) {
        var def = $q.defer()
        $http.post(BASE_URL + '/api/users/reset-password', {
            code: params.code,
            password: params.password
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
