angular.module('app', ['ngRoute'])

  .controller('categoriesController', function($scope, dataService){

    dataService.getCategories(function(response){
      console.log(response.data);
      return response.data;
    })
  })

  .service('dataService', function($http){

    this.getRecipes = function(callback){
      $http.get('/api/recipes')
        .then(callback);

    this.getCategories = function(callback){
      $http.get('/api/categories')
        .then(callback)
    }

      })
    }
  })
}
