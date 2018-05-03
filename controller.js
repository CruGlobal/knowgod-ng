angular.module('knowGod', ['ngRoute'])
  .config(function ($locationProvider, $httpProvider, $qProvider, $routeProvider) {
    $locationProvider.html5Mode(true).hashPrefix('');
    $httpProvider.useApplyAsync(true);

    $routeProvider
      .when('/:langCode', {
        title: 'KnowGod.com', 
        controller: 'KnowGodController'
      })
      .when('/:langCode/:toolCode', {
        title: 'KnowGod.com', 
        controller: 'KnowGodController'
      })
      .when('/:langCode/:toolCode/:pageNumber', {
        title: 'KnowGod.com', 
        controller: 'KnowGodController'
      })      
      .otherwise({
        title: 'KnowGod.com',
        redirectTo: '/',
        controller: 'KnowGodController'
      });

  })
  .factory('languages', function ($http, $q) {
    var service = {};
    var _url = 'https://mobile-content-api.cru.org/languages/';
    var _language = {};

    service.langs = {};

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
        service.langs = $(data.data)[0].data;
        service.setLang(service.langs.filter(function(x) { return x.id == 1 })[0]);
      })
      return deferred.promise;
    }

    return service;
  })
  .factory('manifest', function ($routeParams, $http, $q, page) { //should be called by url?
    var service = {};
    var baseUrl = 'http://0.0.0.0:8000/knowGodResource/';
    var _url = '392380f776ebdffe4a0fd286e522d5cad5930f0b14db0554debf409bc7218c3a.xml';
    var _finalUrl = '';
    var _manifest = '';
    var _page_number = 3;  //this needs to be tied into the URL/location

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

   //load tool
    service.loadManifest = function () {
      makeUrl();
      var deferred = $q.defer();
      $http.get(_finalUrl, {cache: true})
      .then(function(data) {
        deferred.resolve(data);
        _manifest = $(data.data);

        page.setUrl($(_manifest.find("page").get(_page_number-1)).attr("src"));

        page.loadPage();

      })
      return deferred.promise;
    }

    service.lookup = function (filename) {
      var src = _manifest.find("[filename=\""+filename+"\"]").attr("src");
      return baseUrl+src;
    }
    service.percent = function () {
      _page_number = _manifest.find("[src=\""+page.getUrl()+"\"]").index() + 1;
      return (_page_number / _manifest.find('page').length)*100;
    }

   //Navigate tool
    service.nextPage = function () {
      var nextUrl = _manifest.find("[src=\""+page.getUrl()+"\"]").next().attr("src")
      if(nextUrl) {
        page.setUrl(nextUrl);
        page.loadPage();  
      }
      else {
        console.log('end of pages');
      }
      console.log(page.getUrl());
      console.log($routeParams.pageNumber, $routeParams.toolCode, $routeParams.langCode);
    }
    service.prevPage = function () {
      var prevUrl = _manifest.find("[src=\""+page.getUrl()+"\"]").prev().attr("src")
      if(prevUrl) {
        page.setUrl(prevUrl);
        page.loadPage();  
      }
      else {
        console.log('beg of pages');
      }
      console.log(page.getUrl());
    }
    
    return service;
  })
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
          var x2js = new X2JS();
          var aftCnv = x2js.xml_str2json(cnv);
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
  })
  .controller('KnowGodController', function($routeParams, $scope, $http, $window, page, manifest, languages) {
    var knowGod = this;


    languages.loadLanguages().then(function(data){
      knowGod.language = languages;
    })

    manifest.loadManifest().then(function(data){
      knowGod.manifest = manifest;
    })

    knowGod.page = page;

    $routeParams.pageNumber = 1;

    var translations = function(language) {
  //    var url = 'https://mobile-content-api.cru.org/languages/'+language+'?include=custom_pages'  ;
      var url = 'https://mobile-content-api.cru.org/translations';
      $http.get(url, {cache: true}).then(function(response){
        knowGod.translations = response.data;
      });      
    };
    translations(1);

  })
  .run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
  }]);



function getGoogle(url){
  return $http.get(url, {
    cache: true
  });
}

