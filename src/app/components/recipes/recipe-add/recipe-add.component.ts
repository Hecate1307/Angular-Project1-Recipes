import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  recipeForm: FormGroup;
  id: number;
  editing = false;

  private initForm() {
    let recipeName = '';
    let img = '';
    let des = '';
    let ingredientsArray = new FormArray([]);
    if (this.editing) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      img = recipe.imageUrl;
      des = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          ingredientsArray.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [Validators.required]),
              amount: new FormControl(ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imageUrl: new FormControl(img, [Validators.required]),
      description: new FormControl(des, [Validators.required]),
      ingredients: ingredientsArray

    });
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.editing) {
      this.recipeService.updateNewRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addNewRecipe(this.recipeForm.value);
    }
    this.onReset();
  }

  onReset() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddIngredients() {
    const control = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('',
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(control);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editing = params['id'] != null;
      this.initForm();
    });
  }

}
