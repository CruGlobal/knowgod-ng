angular.module('knowGod')
  .factory('page', function ($http, $q, $window) {
    var service = {};
    var baseUrl = 'http://localhost:9000/knowGodResource/';
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
      new Transformation().setXml(_finalUrl)
        .setXslt("http://localhost:9000/knowGodResource/page.xsl").transform("page-content");
//      var deferred = $q.defer();
/*      $http.get(_finalUrl, 
      {
                cache: true
      })
      .then(function(data) {
  //      deferred.resolve(data);
        var regexTagOpen = /(<[a-z]+)(:)([a-z])/gi;
        var regexTagClose = /(<\/[a-z]+)(:)([a-z])/gi;
        var newOut = "";
        newOut = String(data.data).replace(regexTagOpen,"$1$3");
        newOut = newOut.replace(regexTagClose,"$1$3");
        service.content = newOut;

      })*/
   //   return deferred.promise;
    }
    return service;
  });
