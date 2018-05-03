angular.module('knowGod')
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
//using jquery!
        _manifest = data.data;
  //can use attr, but not get, and find is ok in this instance.
        page.setUrl($(_manifest.find("page").get(_page_number-1)).attr("src"));

        page.loadPage();

      })
      return deferred.promise;
    }

    service.lookup = function (filename) {
//using jquery!! .attr is ok, .find is not ok, as it's searching attributes
      var src = _manifest.find("[filename=\""+filename+"\"]").attr("src");
      return baseUrl+src;
    }
    service.percent = function () {
//using jquery!! .attr is ok, .find is not ok, as it's searching attributes
      _page_number = _manifest.find("[src=\""+page.getUrl()+"\"]").index() + 1;
      return (_page_number / _manifest.find('page').length)*100;
    }

   //Navigate tool
    service.nextPage = function () {
//using jquery!! .attr is ok, .find is not ok, as it's searching attributes
      var nextUrl = _manifest.find("[src=\""+page.getUrl()+"\"]").next().attr("src");
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
//using jquery!! .attr is ok, .find is not ok, as it's searching attributes
      var prevUrl = _manifest.find("[src=\""+page.getUrl()+"\"]").previousElementSibling.attr("src");
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
  });
