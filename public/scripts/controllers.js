//controllers for app
(function(){

'use strict';

  angular.module('app')

    //controller for recipes view
    .controller('RecipesController', function($scope, dataService){

      //invoke getCategories API call then make available to view
      dataService.getCategories(function(response){
        $scope.categoriesArray = response.data;
      });

      //create function for view to call and display list of categories by pick list
      $scope.changedCategory = function(category){
        dataService.getCategory(category, function(response){
          $scope.recipesFiltered = response.data;
        });
      };

      //make api call to get list of recipes and make data available to view
      dataService.getRecipes(function(response){
        $scope.recipesFiltered = response.data;
      });

      //function to delete a receipe
      $scope.delete = function(index, recipe){
        if(confirm('Are you sure you want to delete this recipe?') === true){
          $scope.recipesFiltered.splice(index, 1);
          dataService.deleteRecipe(recipe);

        };
      };

    })

    //controller for recipe-detail view
    .controller('RecipeDetailController', function($scope, dataService, $location){

      //block of logic for edit route
      if($location.url() !== '/add'){
        //get param from URL and make available in scope
        let url = $location.url();
        let id = url.split("/").pop();

        //make api call with id to get recipe, make recipe available
        dataService.getRecipe(id, function(response){
          $scope.recipe = response.data;
        });

        //create function for updateRecipe api call and attach to scope
        $scope.updateRecipe = function(recipe){
          let id = recipe._id;
          dataService.updateRecipe(id, recipe);
        };

        //block of logic for add route
      } else if ($location.url() === '/add') {

        //create a new recipe object for the scope to use
        $scope.recipe = {
          name: "",
          description: "",
          category: "",
          prepTime: 0,
          cookTime: 0,
          ingredients: [
            {
              foodItem: "",
              condition: "",
              amount: 0
            }
          ],
          steps: [
            {
              description: ""
            }
          ]
        };

        //function to call updateRecipe api call for a new recipe
        $scope.updateRecipe = function(recipe){
          dataService.addRecipe(recipe);
        };
      };

      //block of logic to be shared by edit route and add route
      //get categories for select menu
      dataService.getCategories(function(response){
        $scope.categoriesArray = response.data;
      });

      //get fooditems for select menu
      dataService.getFoodItems(function(response){
        $scope.foodItems = response.data;
      });

      //addIngredient function
      $scope.addIngredient = function(){

        //create new ingredient object
        let ingredient_obj = {
          foodItem: "",
          condition: "",
          amount: ""
        };
        //add ingredient_obj to scope recipe.ingredients array
        $scope.recipe.ingredients.push(ingredient_obj);

      };

      //function for deleteIngredient from recipe.ingredients
      $scope.deleteIngredient = function(index){
        $scope.recipe.ingredients.splice(index, 1);
      };

      //function for adding a step
      $scope.addSteps = function(){
        //create a new step object
        let steps_obj = {description: ""};

        //push the step object into recipe.steps
        $scope.recipe.steps.push(steps_obj);
      };

      //function to delete a step from recipe.steps
      $scope.deleteSteps = function(index){
        $scope.recipe.steps.splice(index, 1);
      };

    });
})();
