import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  constructor() { }


  newIngredients = new Subject<Ingredient[]>();

  startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('chicken wings', 6),
    new Ingredient('tomato', 5),
    new Ingredient('orange juice', 5),
    new Ingredient('onion', 5),
    new Ingredient('salt', 5)

  ];

  addItem(newItem: Ingredient): void {
    this.ingredients.push(newItem);
    this.newIngredients.next(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredients(newIngredients: Ingredient[]): void {
    this.ingredients.push(...newIngredients);
    this.newIngredients.next(this.ingredients.slice());
  }

  getIngredientById(id: number): Ingredient {
    return this.ingredients[id];
  }

  updateItem(id: number, newItem: Ingredient) {
    this.ingredients[id] = newItem;
    this.newIngredients.next(this.ingredients.slice());
  }

  delete(id: number): void {
    this.ingredients.splice(id, 1)
    this.newIngredients.next(this.ingredients);
  }

}
