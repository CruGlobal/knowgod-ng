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



    $scope.keys = [];
    $scope.keys.push({ code: 13, action: function() { $scope.open( $scope.focusIndex ); }});
    $scope.keys.push({ code: 37, action: function() { manifest.prevPage(); }});
    $scope.keys.push({ code: 39, action: function() { manifest.nextPage(); }});
    
    $scope.$on('keydown', function( msg, obj ) {
      var code = obj.code;
      $scope.keys.forEach(function(o) {
        if ( o.code !== code ) { return; }
        o.action();
        $scope.$apply();
      });
    });


  })
  .directive('imageResource', ['manifest', function( manifest ) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.imageResource);
        },
        function(value) {
          element.attr('src', manifest.lookup(String(attrs.imageResource).replace(/'/g,'')));
          element.removeAttr('image-resource');
        });
    };
  }])
  .directive('textAlign', function() {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.textAlign);
        },
        function(value) {
          element.addClass(attrs.textAlign);
          element.removeAttr('text-align');
        });
    };
  })
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
  }])
  .directive('keyTrap', function() {
  return function( scope, elem ) {
    elem.bind('keydown', function( event ) {
      scope.$broadcast('keydown', { code: event.keyCode } );
    });
  };
});