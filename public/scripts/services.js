//data service with all api calls
(function(){

'use strict';

  angular.module('app')

    .service('dataService', function($http){

      this.getRecipes = function(callback){
        $http.get('/api/recipes')
          .then(callback);
      };

      this.getCategories = function(callback){
        $http.get('/api/categories')
          .then(callback);
      };

      this.getFoodItems = function(callback){
        $http.get('/api/fooditems')
          .then(callback);
      };

      this.getCategory = function(category, callback){
        $http.get(`/api/recipes?category=${category}`)
          .then(callback);
      };

      this.getRecipe = function(id, callback){
        $http.get(`/api/recipes/${id}`)
          .then(callback);
      };

      this.updateRecipe = function(id, payload){
        $http.put(`/api/recipes/${id}`, payload);
      };

      this.addRecipe = function(payload){
        $http.post('/api/recipes', payload);
      };

      this.deleteRecipe = function(id){
        $http.delete(`/api/recipes/${id}`);
      };
    });
})();
