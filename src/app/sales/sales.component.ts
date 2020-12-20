import { Component, OnInit, ViewChild } from '@angular/core';
// import { Product } from './sales.model';
// import { ProductService } from './sales.service';
import { SortEvent, SelectItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewProduct } from '../new-product/new-product.model';
import { NewProductService } from '../new-product/new-product.service';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  providers: [MessageService],
})
export class SalesComponent implements OnInit, OnDestroy {
  products: NewProduct[];
  productsHeader: NewProduct[];
  loading: boolean = true;
  @ViewChild('dt') table: Table;

  newProducts: NewProduct[];
  private subscription: Subscription;

  constructor(private productService: NewProductService) {}

  ngOnInit(): any {
    // this.productService
    //   .getProductsHeader()
    //   .then((data) => (this.productsHeader = data));
    this.productService.getProducts().then((data) => (this.products = data));

    this.newProducts = this.productService.getNewProducts();
    this.subscription = this.productService.productsChanged.subscribe(
      (newProducts: NewProduct[]) => {
        this.newProducts = newProducts;
      }
    );

    // console.log("subscription === ", this.subscription );
  }

  onEditItem(index: number) {
    this.productService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
