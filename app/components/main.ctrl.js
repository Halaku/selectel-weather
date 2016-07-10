(function () {
  'use strict';
  angular.module('swApp')
    .controller('mainCtrl', mainCtrl)

  function mainCtrl(dataservice) {
    var vm = this;

    vm.searchOptions = {
      types: '(cities)'
    };
    vm.city = '';
    vm.cityDetails = {};
    vm.cityLat = 0;
    vm.cityLng = 0;
    vm.sd = function () {
      vm.cityLat = vm.cityDetails.geometry.location.lat();
      vm.cityLng = vm.cityDetails.geometry.location.lng();
      dataservice.getForecast('forecast10day', 'RU', vm.cityLat, vm.cityLng)
        .then(function (res) {
          console.log(res)
        })
    }
  }
})();