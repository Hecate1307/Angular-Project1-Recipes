import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../components/recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../components/auth/auth.service';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private recipeService: RecipeService,
    private authService: AuthService) {
  }

  private baseUrl = 'https://recipebook-887f5-default-rtdb.firebaseio.com/recipes.json';

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(this.baseUrl, recipes).subscribe((response) => {
        console.log(response);
      });

  }
}
