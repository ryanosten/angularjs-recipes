var app = angular.module('app', ['ngRoute'])

  .controller('RecipesController', function($scope, dataService){

    dataService.getCategories(function(response){
      $scope.categoriesArray = response.data;
    });

    $scope.changedCategory = function(category){
      dataService.getCategory(category, function(response){
        $scope.recipesFiltered = response.data;
      });
    };

    dataService.getRecipes(function(response){
      $scope.recipesFiltered = response.data;
    });

    $scope.delete = function(recipe){
      let index = $scope.recipesFiltered.indexOf(recipe);
      $scope.recipesFiltered.splice(recipe, 1);

      dataService.deleteRecipe(recipe, function(response){});
    };
    /*
    $scope.viewRecipe = function(id){
      dataService.getRecipe(id, function(response){
        $scope.recipeDetail = response.data;
      })
      console.log(id);
    };
    */
  })


  .controller('RecipeDetailController', function($scope, dataService, $location){

    //controller logic for edit route
    if($location.url() !== '/add'){
      //get param from URL and make available in scope
      let url = $location.url();
      let id = url.split("/").pop();
      $scope.currentRecipe = id;

      dataService.getRecipe(id, function(response){
        $scope.recipe = response.data;
      });

      dataService.getCategories(function(response){
        $scope.categoriesArray = response.data;
      });

      dataService.getFoodItems(function(response){
        $scope.foodItems = response.data;
      });
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

    this.getFoodItems = function(callback){
      $http.get('/api/fooditems')
        .then(callback)
    }

    this.getCategory = function(category, callback){
      $http.get(`/api/recipes?category=${category}`)
        .then(callback)
    }

    this.getRecipe = function(id, callback){
      $http.get(`/api/recipes/${id}`)
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

    this.deleteRecipe = function(id, callback){
      $http.delete(`/api/recipes/${id}`)
        .then(callback)
    }

  })
