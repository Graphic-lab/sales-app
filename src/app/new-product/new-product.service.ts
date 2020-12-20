import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { Observable, pipe  } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
//import { Product } from './sales.model';
import { NewProduct } from './new-product.model';

@Injectable()
export class NewProductService {
  productsChanged = new Subject<NewProduct[]>();
  startedEditing = new Subject<number>();
  productsUrl = 'assets/potato_sales.json';

  private products: NewProduct[] = [];

  constructor(private http: HttpClient) {}

  // constructor(private http: HttpClient) {
  //     this.getJSON().subscribe(data => {
  //         console.log("getJSON === ", data);
  //     });
  // }

  // public getJSON(): Observable<any> {
  //     return this.http.get('assets/potato_sales.json');
  // }

  // private productsJSON = this.http
  //     .get<any>('assets/potato_sales.json')
  //     .toPromise()
  //     .then((res) => res.data)
  //     .then((data) => {
  //       data.forEach(
  //         (item) =>
  //           (item.totalSales =
  //             item.salesQ1 + item.salesQ2 + item.salesQ3 + item.salesQ4)
  //       );
  //       console.log("productsJSON == ", data);
  //       return data;
  //   });

  // productsClassInstance$ = this.http.get<NewProduct[]>(this.productsUrl)
  // .pipe(
  //   map(products => products.map(product => {
  //     const productInstance: NewProduct = Object.assign(new NewProduct(), {
  //       ...product,
  //       productName: "test productName",
  //     });
  //     console.log("productInstance == ", productInstance);

  //     return productInstance;
  //   })),
  //   // catchError(this.handleError)
  // );

  // getProductsHeader(): any {
  //   return this.http
  //     .get<any>('assets/potato_sales.json')
  //     .toPromise()
  //     .then((res) => res.column)
  //     .then((column) => {
  //       return column;
  //     });
  // }
  getProducts(): any {
    return (
      this.http
        // .get<any>('assets/potato_sales.json')
        .get<any>(this.productsUrl)
        .toPromise()
        .then((res) => res.data)
        .then((data) => {
          data.forEach(
            (item) =>
              (item.totalSales =
                item.salesQ1 + item.salesQ2 + item.salesQ3 + item.salesQ4)
          );
          // console.log("data == ", data);

          return data;
        })
    );
  }

  getNewProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }

  addProduct(product: NewProduct) {
    this.products.push(product);
    console.log('this.products === ', this.products);

    this.productsChanged.next(this.products.slice());
    console.log('this.productsChanged === ', this.productsChanged);
  }

  addProducts(products: NewProduct[]) {
    this.products.push(...products);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(index: number, newProduct: NewProduct) {
    this.products[index] = newProduct;
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }
}
