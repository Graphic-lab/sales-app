import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { NewProduct } from './new-product.model';
import { NewProductService } from './new-product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
})
export class NewProductComponent implements OnInit, OnDestroy  {
  @ViewChild('f', { static: false }) npForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: NewProduct;

  constructor(private npService: NewProductService) {}

  ngOnInit() {
    this.subscription = this.npService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.npService.getProduct(index);
        this.npForm.setValue({
          productID: this.editedItem.productID,
          productName: this.editedItem.productName,          
          manager: this.editedItem.manager,
          startDate: this.editedItem.startDate,
          // name: this.editedItem.name,
          // amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newProduct = new NewProduct(
      value.productID, 
      value.productName,     
      value.manager,
      value.startDate,
      // value.name,
      // value.amount
      );
    if (this.editMode) {
      this.npService.updateProduct(this.editedItemIndex, newProduct);
    } else {
      this.npService.addProduct(newProduct);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.npForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.npService.deleteProduct(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
