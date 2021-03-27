import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../../../services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

}
