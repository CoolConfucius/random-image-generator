'use strict'; 

var app = angular.module("someApp", ["ui.router"]); 

app.service('Todo', function($http) {
  
  this.todos = function() {
    return $http.get('/todos').then(res => {
      this.data = res.data; 
      console.log(this.data, "this data");
    }); 
  }; 

  this.getTodos = function(cb) {
    return $http.get('/todos').then(res => {
      this.data = res.data; 
      console.log(this.data, "this data");
      cb();
    }); 
  }

  this.add = function(todo) {
    return $http.post('/todos', todo)
  };

  this.toggle = function(todo) {
    return $http.put(`/todos/${todo}`)
  };

  this.remove = function(todo) {
    return $http.delete(`/todos/${todo}`)
  };

  // this.generateImage = function() {
  //   return $http.get('/todos/gri').then(res => {
  //     this.data = res.data;
  //     console.log(this.data, "this data");
  //     cb(); 
  //   });
  // };

  this.generateImage = function() {
    return $http.post('/todos/gri', {}).then(res => {
      this.data = res.data;
      console.log(this.data, "this data");
      // cb(); 
    });
  };

});

app.run(function(Todo, $rootScope){
  console.log("run app");
  Todo.todos();
  $rootScope.todos = Todo.data; 
});

app.controller('homeCtrl', function($rootScope, $scope, $state, Todo){
  $scope.getTodos = Todo.getTodos(function(){
    console.log("homeCtrl ctrl");
  // console.log(Todo.todos(), "here?"); 
    $rootScope.todos = Todo.data; 
    $scope.todos = $rootScope.todos;
    // $scope.todos = Todo.data;
    console.log("Scope todos", $scope.todos);
    console.log("Scope todos", Todo.data);
  });

  $scope.sort = function(key){
    console.log("sort!");
    if ($scope.sorttext === key) {
      $scope.sorttext = '-'+key;   
    } else {
      $scope.sorttext = key; 
    }
  };


  $scope.generateImage = function(){
    console.log("generateImage");
    Todo.generateImage(); 
  }


  $scope.remove = function(todo){
    var realIndex = $scope.todos.indexOf(todo); 
    $scope.todos.splice(realIndex, 1);
    Todo.remove(todo._id.toString()); 
  }


})
