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
    vm.forecast = [];
    vm.error = '';

    vm.getForecast = getForecast;

    function getForecast() {
      console.log('клац');
      if (vm.cityDetails.geometry) {
        vm.cityLat = vm.cityDetails.geometry.location.lat();
        vm.cityLng = vm.cityDetails.geometry.location.lng();
      }

      dataservice.getForecast('forecast10day', 'RU', vm.cityLat)
        .then(successAns, errorAns);

      function successAns(resp) {
        vm.forecast = resp.data.forecast.simpleforecast.forecastday;
        vm.error = '';
        console.log(vm.forecast);
      }

      function errorAns() {
        vm.error = 'О нет! Запрос заблудился! Возможно ему сейчас скучно и одиноко, мы сделаем всё, чтобы он нашёл свою маму!'
      }
    }
  }
})();