(function () {
  'use strict';

  angular
    .module('taxiManagement')
    .controller('NotificationsController', NotificationsController)

  function NotificationsController($scope, $state, Notification) {
    var vm = this;

    vm.goToID = goToID;

    vm.translation = {
      'register_expire': 'Registro',
      'sacta_expire': 'SACTA',
      'driver': 'Chofer'
    }

    activate();

    function activate() {
      console.log("activate");

      loadNotifications()
    }

    function goToID(notification) {
      var route = {
        'driver': 'main.singleDriver'
      }

      $state.go(route[notification.notifiable], {id: notification.notifiable_id})
    }

    function formatted(notifications) {
      function formatEach(notification) {

        notification.expire_date = formatDate(notification.expire_date);
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

      notifications.forEach(formatEach);

      return notifications;
    }

    function loadNotifications() {
      Notification.read()
        .then(function (result) {
          vm.notifications = formatted(result.data);
          console.log(vm.notifications)
        })
        .catch(function (err) {
          console.log('Notifications not loaded')
        })
    }
  }

})();
