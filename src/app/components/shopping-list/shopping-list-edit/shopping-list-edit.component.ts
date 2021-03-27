import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppinglistService } from '../../../services/shoppinglist.service';
import { Ingredient } from '../../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {


  @ViewChild('f') form: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemId: number;
  editedItem: Ingredient;

  constructor(private shoppinglistService: ShoppinglistService) { }

  onSubmit(form: NgForm) {
    const item = new Ingredient(form.value.name,
      form.value.amount);
    if (this.editMode) {
      this.shoppinglistService.updateItem(this.editedItemId, item);
    } else {
      this.shoppinglistService.addItem(item);
    }

    this.editMode = false;
    this.form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppinglistService.delete(this.editedItemId);
    this.onClear();
  }

  ngOnInit(): void {
    this.subscription = this.shoppinglistService.startEditing.subscribe((id: number) => {
      this.editMode = true;
      this.editedItemId = id;
      this.editedItem = this.shoppinglistService.getIngredientById(id);
      this.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
