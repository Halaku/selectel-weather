(function () {
  'use strict';
  angular.module('swApp')
    .factory('dataservice', dataservice)
  function dataservice($http, $q) {
    var baseUrl = 'http://api.wunderground.com/';
    var apiKey = 'api/6397708116b30634/'
    var service = {
      getForecast: getForecast
    };
    return service;


    // https://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1


    function getForecast(type, lang, lat, lon) {
      var coords = '';

      if (lat && lon) {
        coords = lat.toFixed(1) + ',' + lon.toFixed(1);
      } else {
        coords = 'autoip';
      }

      return $http.get(baseUrl + apiKey + type + '/' + 'lang:' + lang + '/q/' + coords + '.json').then(successResp, errorResp);

      function successResp(data) {
        return data;
      }

      function errorResp(error) {
        return $q(function (resolve, reject) {
          return reject(error);
        })
      }
    }
  }
})();