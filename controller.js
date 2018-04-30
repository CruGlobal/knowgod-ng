angular.module('knowGod', ['ngRoute'])
  .config( function ($locationProvider, $httpProvider, $qProvider, $routeProvider) {
    $locationProvider.html5Mode(true).hashPrefix('');
    $httpProvider.useApplyAsync(true);

/*    $routeProvider
      .when('/en', {
        title: 'KnowGod.com'
      })*/  

  })
  .factory('languages', function ($http, $q) {
    var service = {};
    var _url = 'https://mobile-content-api.cru.org/languages/';
    var _language = {};

    service.langs = {};

    service.setLang = function(lang) {
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
      $http.get(_url).then(function(data) {
        deferred.resolve(data);
        service.langs = $(data.data)[0].data;
        service.setLang(service.langs.filter(function(x) { return x.id == 1 })[0]);
      })
      return deferred.promise;
    }

    return service;
  })
  .factory('manifest', function ($http, $q, page) {
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

   //load tool
    service.loadManifest = function () {
      makeUrl();
      var deferred = $q.defer();
      $http.get(_finalUrl/*, 
      {
        transformResponse: function (cnv) {
          var x2js = new X2JS();
          var aftCnv = x2js.xml_str2json(cnv);
          return aftCnv;
        }
      }*/)
      .then(function(data) {
        deferred.resolve(data);
        _manifest = $(data.data);
      })
      return deferred.promise;
    }

    service.lookup = function (filename) {
      var src = _manifest.find("[filename=\""+filename+"\"]").attr("src");
      return baseUrl+src;
    }
    service.percent = function () {
      var page_number = _manifest.find("[src=\""+page.getUrl()+"\"]").index() + 1;
      return (page_number / _manifest.find('page').length)*100;
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
        }
      })
      .then(function(data) {
  //      deferred.resolve(data);
        service.content = data.data.page;
      })
   //   return deferred.promise;
    }
    return service;
  })
  .controller('KnowGodController', function($scope, $http, $window, page, manifest, languages) {
    var knowGod = this;

    languages.loadLanguages().then(function(data){
      knowGod.language = languages;
    })

    manifest.loadManifest().then(function(data){
      knowGod.manifest = manifest;
    })
//    page.setUrl('67b7c3d321c94ff23bc585d15ee8e7f15c7cec493c8074973b251053977d5ecb.xml');
    page.setUrl('743fa53e8470cd67e1ca12ea05fbd4bd64dea08b7326691cbd888b107a2836ce.xml');
//    page.setUrl('f1165b62b93e61461f64446b3198c3a9245c9f784c1fcf25efa7fd71b85e21f0.xml');
//    page.setUrl('908a4c4c092d97db3f3c7b59a3fdb03ecf4da204bfd3f283568b7a2614635ee4.xml');
//    page.setUrl('90feba69d384d8d99f67f7ad024797577c3ca46be73a3c0f7928b63fc316669e.xml');
//    page.setUrl('9ba065f199f726187fddd8a7be640b3f9e3e8b63bb9a95457a0da8d79cef0063.xml');

    knowGod.loadPage = function () {
      page.loadPage()
        .then(function (data) {
          knowGod.page = data.data.page;
        }, function (data) {
        })
    }
    page.loadPage();
    knowGod.page = page;

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

