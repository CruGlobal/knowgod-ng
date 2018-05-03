angular.module('knowGod')
  .factory('page', function ($http, $q) {
    var service = {};
    var baseUrl = 'http://0.0.0.0:8000/knowGodResource/';
    var _url = '';
    var _finalUrl = '';

    var makeUrl = function () {
      _finalUrl = baseUrl + _url;
      return _finalUrl;
    }

    service.setUrl = function (url) {
      _url = url;
    }

    service.getUrl = function () {
      return _url;
    }

    service.content = {};
    service.loadPage = function () {
      makeUrl();
//      var deferred = $q.defer();
      $http.get(_finalUrl, 
      {
        transformResponse: function (cnv) {
          var convert = require('xml-js');
          var aftCnv = convert.xml2json(cnv, {compact: false, spaces: 4});
          return aftCnv;
        },
        cache: true
      })
      .then(function(data) {
  //      deferred.resolve(data);
        service.content = data.data.page;
      })
   //   return deferred.promise;
    }
    return service;
  });
