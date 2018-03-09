angular.module('todoApp', [])
  .factory('mcAPIservice', function($http, $sce) {
    var yolo = 'yolo';

    $http.jsonp($sce.trustAsResourceUrl('https://jsonplaceholder.typicode.com/posts/1'), {jsonpCallbackParam: 'callback'}).then(function (data) {
      yolo = data;
    });;

    return yolo;
  })
  .controller('KnowGodController', function(mcAPIservice) {
    var knowGod = this;
    knowGod.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
    
    //There's my new variable
    knowGod.content = 'todile';
    knowGod.driver = mcAPIservice;
 
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

