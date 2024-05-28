import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent {
  @Output() recipeWasSeletec = new EventEmitter<Recipe>()
  recipes : Recipe[] = [
    new Recipe("A Test Recipe","This is simply a test","https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2022-02-Air-Fryer-Roasted-Potatoes%2FIMG_6850"),
    new Recipe("A Test Recipe","This is simply a test","https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2022-02-Air-Fryer-Roasted-Potatoes%2FIMG_6850")
  ];

  onRecipeSeletect(recipe : Recipe){
    this.recipeWasSeletec.emit(recipe)
  }
}
