import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppong-list.service';
import { Subject } from 'rxjs';
// import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    // recipeSelected = new Subject<Recipe>();
    recipeChanged = new Subject<Recipe[]>()
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe',
    //         'This is simply a test',
    //         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 1)
    //         ]
    //     ),
    //     new Recipe(
    //         'Another Test Recipe',
    //         'This is simply a test',
    //         'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //         [
    //             new Ingredient('Apple', 2),
    //             new Ingredient('Buns', 2)
    //         ]
    //     ),
    // ];
    private recipes : Recipe[] = [];

    constructor(private slService: ShoppingListService) { }

    setRecipes(recipes : Recipe[]){
        this.recipes = recipes
        this.recipeChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientToShoppingList(ingredient: Ingredient[]) {
        this.slService.addIngredients(ingredient)
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index]
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipeChanged.next(this.recipes.slice())
    }
    updateReicpe(index:number,newRecipe:Recipe){
        this.recipes[index] = newRecipe
        this.recipeChanged.next(this.recipes.slice())

    }
    delteRecipe(index:number){
        this.recipes.splice(index,1)
        this.recipeChanged.next(this.recipes.slice())

    }
}
