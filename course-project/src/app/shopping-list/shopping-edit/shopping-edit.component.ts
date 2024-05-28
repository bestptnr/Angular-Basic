import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoppong-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  @ViewChild('f', { static: true }) slForm: NgForm

  subscription: Subscription;
  editMode: boolean = false
  editItemIndex: number;
  editedItem: Ingredient

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startEditing.subscribe((index) => {
      this.editMode = true
      this.editItemIndex = index
      this.editedItem = this.slService.getIngredient(index)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editItemIndex, newIngredient)
    } else {
      this.slService.addIngredient(newIngredient)
    }
    this.editMode = false
    this.slForm.reset()
  }

  onClear(){
    this.slForm.reset()
    this.editMode = false
  }
  onDelete(){
    this.onClear()
    this.slService.deleteIngredient(this.editItemIndex)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
