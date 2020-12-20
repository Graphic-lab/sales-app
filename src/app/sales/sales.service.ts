import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from './sales.model';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductsHeader(): any {
    return this.http
      .get<any>('assets/potato_sales.json')
      .toPromise()
      .then((res) => res.column)
      .then((column) => {
        return column;
      });
  }
  getProducts(): any {
    return this.http
      .get<any>('assets/potato_sales.json')
      .toPromise()
      .then((res) => res.data)
      .then((data) => {
        data.forEach(
          (item) =>
            (item.totalSales =
              item.salesQ1 + item.salesQ2 + item.salesQ3 + item.salesQ4)
        );
        return data;
      });
  }
}
