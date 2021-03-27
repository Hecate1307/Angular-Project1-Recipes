import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { DataService } from 'src/app/shared/data.service';

import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private dataService: DataService,
        private recipesService: RecipeService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();

        if (recipes.length === 0) {
            return this.dataService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}
