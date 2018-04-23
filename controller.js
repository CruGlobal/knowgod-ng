angular.module('knowGod', [])
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

    service.loadPage = function () {
      makeUrl();
      var deferred = $q.defer();
      $http.get(_finalUrl, 
      {
        transformResponse: function (cnv) {
          var x2js = new X2JS();
          var aftCnv = x2js.xml_str2json(cnv);
          return aftCnv;
        }
      })
      .then(function(data) {
        deferred.resolve(data);
      })
      return deferred.promise;
    }
    return service;
  })
  .factory('manifest', function ($http, $q, $window) {
    var service = {};
    var baseUrl = 'http://0.0.0.0:8000/knowGodResource/';
    var _url = '392380f776ebdffe4a0fd286e522d5cad5930f0b14db0554debf409bc7218c3a.xml';
    var _finalUrl = '';
    var _manifest = '';

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

    service.loadManifest = function () {
      makeUrl();
      var deferred = $q.defer();
      $http.get(_finalUrl, 
      {
        transformResponse: function (cnv) {
          var x2js = new X2JS();
          var aftCnv = x2js.xml_str2json(cnv);
          return aftCnv;
        }
      })
      .then(function(data) {
        deferred.resolve(data);
        _manifest = data.data;
      })
      return deferred.promise;
    }

    service.lookup = function (filename) {

      var deferred = $q.defer();

      var dothething = function () {
        if (_manifest == '') {
          service.loadManifest()
            .then(function (data) {
              $window.alert(JSON.stringify(_manifest));

              deferred.resolve(data);

              return _manifest;
            }, function (data) {
              return $window.alert(data);
            })
        }
        else {
          $window.alert(JSON.stringify(_manifest));   
        }
      }
      //return dothething();
      return deferred.promise;
    }
    return service;
  })
  .controller('KnowGodController', function($scope, $http, $window, page, manifest) {

    var knowGod = this;
    knowGod.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];

    page.setUrl('743fa53e8470cd67e1ca12ea05fbd4bd64dea08b7326691cbd888b107a2836ce.xml');
    knowGod.loadPage = function () {
      page.loadPage()
        .then(function (data) {
          knowGod.page = data.data.page;
        }, function (data) {
          $window.alert(data);
        })
    }
    knowGod.loadPage();
    manifest.lookup('01_Home.xml').then(function(data){
      console.log(data);

    })

    var languages = function() {
      var url = 'https://mobile-content-api.cru.org/languages/';
      $http.get(url).then(function(response){
        knowGod.languages = response.data;
      });
    }
    languages();

    var translations = function(language) {
  //    var url = 'https://mobile-content-api.cru.org/languages/'+language+'?include=custom_pages'  ;
      var url = 'https://mobile-content-api.cru.org/translations';
      $http.get(url).then(function(response){
        knowGod.translations = response.data;
      });      
    };
    translations(1);

  });



function getGoogle(url){
  return $http.get(url, {
    cache: true
  });
}

