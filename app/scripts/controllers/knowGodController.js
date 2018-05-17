angular.module('knowGod')
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
  .directive('imageResource', ['$compile', 'manifest', function( $compile, manifest ) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.imageResource);
        },
        function(value) {
          element.attr('src', manifest.lookup(attrs.imageResource));
          element.removeAttr('image-resource');
        });
    };
  }])
  .directive('compile', ['$compile', function( $compile ) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compile);

        },
        function(value) {
          element.html(value);

          $compile(element.contents())(scope);
        });
    };
  }]);