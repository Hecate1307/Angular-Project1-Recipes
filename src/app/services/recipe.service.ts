import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../components/recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private shoppinglistService: ShoppinglistService) { }

  recipeChanged = new Subject<Recipe[]>();


  private recipes: Recipe[] = [];
  // [
  //   new Recipe('Low - Carb Cream of Mushroom Soup',
  //     'This creamy mushroom soup uses cream cheese to beautifully thicken this delicious soup. The low-carb, high fat proportions are perfect for a ketogenic lifestyle.',
  //     'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5691661.jpg&w=595&h=595&c=sc&poi=face&q=85',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('shallot', 1),
  //       new Ingredient('asparagus', 2),
  //       new Ingredient('olive oil', 1),
  //       new Ingredient('chicken', 1),
  //     ]),
  //   new Recipe('Asparagus, Lemon, and Mint Soup',
  //     'This soup is easy to make. Asparagus has a strong flavor by itself, so I chose to add a few mint leaves and lemon zest to give it a wonderfully fresh aroma!',
  //     'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1381134.jpg&w=596&h=596&c=sc&poi=face&q=85',
  //     [
  //       new Ingredient('lemon', 1),
  //       new Ingredient('hard-boiled egg', 1),
  //       new Ingredient('hard-boiled egg', 2),
  //       new Ingredient('olive oil', 1),
  //       new Ingredient('chicken', 1),
  //     ])
  // ];

  setRecipes(newRecipes: Recipe[]) {
    this.recipes = newRecipes;
    this.recipeChanged.next(this.recipes.slice());

  }

  addIngredientsToShoppingCart(ingredients: Ingredient[]): void {
    this.shoppinglistService.addIngredients(ingredients);
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
  // will return a copy of the recipes array
  getRecipeById(id: number): Recipe {
    return this.recipes.slice()[id];
  }

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());

  }

  updateNewRecipe(id: number, recipe: Recipe) {

    this.recipes[id] = recipe;
    console.log(recipe.imageUrl);
    this.recipeChanged.next(this.recipes.slice());

  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice());
  }


}//
