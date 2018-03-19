angular.module('knowGod', [])
  /*.factory('mcAPIservice', function($http, $sce) {
    var yolo = 'yolo';

    $http.jsonp($sce.trustAsResourceUrl('https://jsonplaceholder.typicode.com/posts/1'), {jsonpCallbackParam: 'callback'}).then(function (data) {
      yolo = data;
    });;

    return yolo;
  })*/
  .value('load_song', '')
  .controller('KnowGodController', function($scope, $http, $window) {
    var knowGod = this;
    knowGod.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];

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
    }
    translations(1);

    
    var resourced = function() {
//      var url = 'https://mobile-content-api.cru.org/drafts/678/?page_id=5';
      var url = 'https://mobile-content-api.cru.org/languages';
      $http.get(url).then(function(response){
        knowGod.resources = response.data;
      });
    }
    resourced();

 


 //TODO app - can be removed 
    knowGod.addTodo = function() {
      knowGod.todos.push({text:knowGod.todoText, done:false});
      knowGod.todoText = '';
    };
 
    knowGod.remaining = function() {
      var count = 0;
      angular.forEach(knowGod.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    knowGod.archive = function() {
      var oldTodos = knowGod.todos;
      knowGod.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) knowGod.todos.push(todo);
      });
    };
  });

