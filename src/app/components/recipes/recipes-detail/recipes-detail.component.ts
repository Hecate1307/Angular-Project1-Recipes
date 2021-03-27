import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
    private router: Router) {
  }

  AddToShoppingList() {
    this.recipeService.addIngredientsToShoppingCart(this.recipe.ingredients);
    this.router.navigate(['../../shopping-list'], { relativeTo: this.route });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });

  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipeById(this.id);
      });
  }

}
