angular.module('knowGod')
  .factory('languages', function ($http, $q) {
    var service = {};
    var _url = 'https://mobile-content-api.cru.org/languages/';
    var _language = {};

    service.langs = {};

    service.direction = 'ltr';

    service.setLang = function(lang) {  //this needs to be tied into the URL/location bar via language code
      _language = lang;
    }
    service.getLang = function() {
      return _language;
    }
    service.langHidden = true;

    service.hideLang = function() {
      service.langHidden = !service.langHidden;
    }

    service.loadLanguages = function () {
      var deferred = $q.defer();
      $http.get(_url, {cache: true}).then(function(data) {
        deferred.resolve(data);

        service.langs = data.data.data;
        service.setLang(service.langs.filter(function(x) { return x.id == 1 })[0]);
      })
      return deferred.promise;
    }

    return service;
  });
