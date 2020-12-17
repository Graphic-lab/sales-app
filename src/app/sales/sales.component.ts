import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "./sales.service";
import { Product } from "./sales.model";
import { SortEvent, SelectItem, MessageService } from "primeng/api";
import { Table } from "primeng/table";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.scss"],
  providers: [MessageService],
})
export class SalesComponent implements OnInit {
  products: Product[];
  productsHeader: Product[];
  loading: boolean = true;
  clonedProducts: { [s: string]: Product } = {};

  @ViewChild("dt") table: Table;

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.productService
      .getPotatoesHeader()
      .then((data) => (this.productsHeader = data));
    this.productService.getPotatoes().then((data) => (this.products = data));
    // console.log("clonedProducts == ", this.clonedProducts);
    // console.log("products === ", this.productService.getPotatoes().then(data => this.products = data));
    // console.log("headers === ", this.productService.getPotatoesHeader().then(data => this.productsHeader = data));
}

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === "string" && typeof value2 === "string")
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.productID] = { ...product };
  }

  onRowEditSave(product: Product) {
    if (!product.totalSales) {
      delete this.clonedProducts[product.productID];
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Product is updated",
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Invalid Price",
      });
    }
  }

  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.productID];
    delete this.products[product.productID];
  }
}
