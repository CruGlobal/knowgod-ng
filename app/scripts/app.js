angular.module('knowGod')
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
  .run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
    });
  }]);
