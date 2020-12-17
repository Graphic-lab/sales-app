import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './sales.service';
import { Product } from './sales.model';
import { SortEvent, SelectItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  providers: [MessageService],
})
export class SalesComponent implements OnInit {
  products: Product[];
  productsHeader: Product[];
  loading: boolean = true;
  @ViewChild('dt') table: Table;

  constructor(private productService: ProductService) {}

  ngOnInit(): any {
    this.productService
      .getPotatoesHeader()
      .then((data) => (this.productsHeader = data));
    this.productService.getPotatoes().then((data) => (this.products = data));
  }
}
