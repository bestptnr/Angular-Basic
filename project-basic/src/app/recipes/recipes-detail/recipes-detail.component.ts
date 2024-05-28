import { Component, Input } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrl: './recipes-detail.component.css'
})
export class RecipesDetailComponent {

  @Input() recipe : Recipe
  
}
