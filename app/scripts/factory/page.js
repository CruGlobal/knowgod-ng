angular.module('knowGod')
  .factory('page', function ($http, $q, $window, $sce) {
    var service = {};
    var baseUrl = 'http://localhost:9000/knowGodResource/';
    var _url = '';
    var _finalUrl = '';
    service.html = '';

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

    service.loadPage = function () {
      makeUrl();
      var returnedStr = 'not doen';
      $q.all([$http.get(_finalUrl), $http.get("http://localhost:9000/knowGodResource/page.xsl")]).then(function(data){ 
        returnedStr = new Transformation().setXml(data[0].data).setXslt(data[1].data).transform();
        service.html = $sce.trustAsHtml(returnedStr);
      });

    }
    return service;
  });
