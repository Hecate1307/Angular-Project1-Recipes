import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { RecipeService } from '../../services/recipe.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private igChange: Subscription;

  constructor(private shoppinglistService: ShoppinglistService, private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.igChange = this.shoppinglistService.newIngredients
      .subscribe(
        (item: Ingredient[]) => {
          this.ingredients = item;
        }
      );
  }
  onEditItem(id: number) {
    this.shoppinglistService.startEditing.next(id);
  }

  ngOnDestroy() {
    this.igChange.unsubscribe();
  }
}
