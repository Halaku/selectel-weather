(function () {
  'use strict';
  angular.module('swApp')
    .controller('mainCtrl', mainCtrl)

  function mainCtrl($scope) {
    var vm = this;

    vm.searchOptions = {
      types: '(cities)'
    };
    vm.city = '';
    vm.cityDetails = {};
    vm.cityLng = 0;
    vm.cityLat = 0;
    vm.sd = function () {
      vm.cityLat = vm.cityDetails.geometry.location.lat();
      vm.cityLng = vm.cityDetails.geometry.location.lng();
    }
  }
})();