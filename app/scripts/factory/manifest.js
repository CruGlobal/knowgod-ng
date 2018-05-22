angular.module('knowGod')
  .factory('manifest', function ($routeParams, $http, $q, page) { //should be called by url?
    var service = {};
    var baseUrl = 'http://localhost:9000/knowGodResource/';
    //var _url = '392380f776ebdffe4a0fd286e522d5cad5930f0b14db0554debf409bc7218c3a.xml';
    var _url = '2ecce0057b5daac5b0325d75db17f80a61886bc47692afa587159365647e25d7.xml';
    var _finalUrl = '';
    var _manifest = '';
    var _page_number = 1;  //this needs to be tied into the URL/location

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

    service.getPageNumber = function () {
      return _page_number;
    }

   //load tool
    service.loadManifest = function () {
      makeUrl();
      var deferred = $q.defer();
      $http.get(_finalUrl, {cache: true})
      .then(function(data) {
        deferred.resolve(data);
        _manifest = angular.element(data.data);
        page.setUrl(angular.element(_manifest.find("page")[_page_number-1]).attr("src"));

        page.loadPage();
        service.percent();

      })
      return deferred.promise;
    }

    service.lookup = function (filename) {
      var url = '';
      angular.forEach(_manifest.find("page"), function(element){
        if(filename.trim() == angular.element(element).attr("filename").trim()){
          url = angular.element(element).attr("src")
        }
      })
      angular.forEach(_manifest.find("resource"), function(element){
        if(filename.trim() == angular.element(element).attr("filename").trim()){
          url = angular.element(element).attr("src")
        }
      })
      return baseUrl + url;
    }
    service.percent = function () {
      var number = 0;
      angular.forEach(_manifest.find("page"), function(element){
        number += 1;
        if(page.getUrl() == angular.element(element).attr("src")){
          _page_number = number;
        }
      })
      return (_page_number / _manifest.find('page').length)*100;
    }

   //Navigate tool
    service.nextPage = function () {
      var nextUrl = '';
      var thistime = 0;
      angular.forEach(_manifest.find("page"), function(element){
        if(page.getUrl() == angular.element(element).attr("src")){
          thistime = 1;
        }
        else if(thistime){
          nextUrl = angular.element(element).attr("src");
          thistime = 0;
        }
      })

      console.log(nextUrl);
      if(nextUrl) {
        page.setUrl(nextUrl);
        page.loadPage();  
      }
      else {
        console.log('end of pages');
      }

      console.log(page.getUrl());
//      console.log($routeParams.pageNumber, $routeParams.toolCode, $routeParams.langCode);
    }
    service.prevPage = function () {
      var prevUrl = '';
      var thistime = 0;
      angular.forEach(Array.prototype.slice.call(_manifest.find("page")).reverse(), function(element){
        if(page.getUrl() == angular.element(element).attr("src")){
          thistime = 1;
        }
        else if(thistime){
          prevUrl = angular.element(element).attr("src");
          thistime = 0;
        }
      })

      console.log(prevUrl);
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
