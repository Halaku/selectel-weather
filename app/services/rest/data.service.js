(function () {
  'use strict';
  angular.module('swApp')
    .factory('dataservice', dataservice)
  function dataservice($http) {
    var baseUrl = 'http://api.wunderground.com/';
    var apiKey = 'api/6397708116b30634/'
    var service = {
      getForecast: getForecast
    };
    return service;


    // https://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1

    
    function getForecast(type, lang, lat, lon) {
      var coords = lat.toFixed(1) + ',' + lon.toFixed(1);
      console.log(coords);
      var url = baseUrl + apiKey + type + '/' + 'lang:' + lang + '/q/' + coords + '.json';
      // console.log(url);
      return $http.get(url);
    }
  }
})();