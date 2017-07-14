var app = angular.module('app', ['ngRoute'])

  .controller('RecipesController', function($scope){

  })

  .controller('categoriesController', function($scope, dataService){

    dataService.getCategories(function(response){
      $scope.categoriesArray = response.data;
    });
  })

  .service('dataService', function($http){

    this.getRecipes = function(callback){
      $http.get('/api/recipes')
        .then(callback);
      }

    this.getCategories = function(callback){
      $http.get('/api/categories')
        .then(callback)
      }

    this.foodItems = function(callback){
      $http.get('/api/fooditems')
        .then(callback)
    }

    this.getCategory = function(callback){
      $http.get('/api/recipes?category={category}')
        .then(callback)
    }

    this.getRecipe = function(callback){
      $http.get('/api/recipes/{id}')
        .then(callback)
    }

    this.updateRecipe = function(callback){
      $http.put('/api/recipes/{id}')
        .then(callback)
    }

    this.addRecipe = function(callback){
      $http.post('/api/recipes')
        .then(callback)
    }

    this.deleteRecipe = function(callback){
      $http.delete('/api/recipes/{id}')
        .then(callback)
    }

  })
