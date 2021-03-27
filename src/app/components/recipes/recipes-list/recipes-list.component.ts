import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../../services/recipe.service';

import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  id: number;
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router,
    private route: ActivatedRoute) { }

  onEdit() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
