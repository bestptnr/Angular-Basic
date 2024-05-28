import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppong-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription
  constructor(private shoppinglistService: ShoppingListService,private loggingSerive : LoggingService ) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIngredients()
    this.igChangeSub = this.shoppinglistService.ingreditensChange.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient
    })

    this.loggingSerive.printLog("Hello form ShoppingListComponent ngOnInit")
  }

  onEditItem(index: number) {
    this.shoppinglistService.startEditing.next(index)
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe()
  }

}
