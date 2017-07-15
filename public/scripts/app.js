var app = angular.module('app', ['ngRoute'])

  .controller('RecipesController', function($scope, dataService){

    dataService.getCategories(function(response){
      $scope.categoriesArray = response.data;
    });

    $scope.changedCategory = function(category){
      dataService.getCategory(category, function(response){
        $scope.recipesByCategory = response.data;
      });
    }

    $scope.listIngredients = function(){
      for(ingredient in recipe.ingredients){
          console.log(ingredient.foodItem);
      }
    }

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

    this.getCategory = function(category, callback){
      $http.get(`/api/recipes?category=${category}`)
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
