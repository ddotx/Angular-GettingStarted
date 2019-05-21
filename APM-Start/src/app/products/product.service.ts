import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap, map } from 'rxjs/operators';

import { IProduct, Product } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    //private productUrl = 'api/products/products.json'; //asset path
    private productsUrl = 'api/products';

    //DI service //* define a dependency for the http client service by using a constructor paramenter
    constructor(private http: HttpClient) {

    }

    // getProducts(): Observable<IProduct[]> {
    //     return this.http.get<IProduct[]>(this.productUrl) //* use generics to specify the returned type

    //         //exception handling
    //         .pipe(
    //             tap(data => console.log('All: ' + JSON.stringify(data))),
    //             catchError(this.handleError)
    //         );
    // }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl)
            .pipe(
                tap(data => console.log('All: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getProduct(id: number): Observable<Product> {
        if (id === 0) {
            return of(this.initializeProduct());
        }
        const url = `${this.productsUrl}/${id}`;
        return this.http.get<Product>(url)
            .pipe(
                tap(data => console.log('getProduct: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    updateProduct(product: Product): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${product.id}`;
        return this.http.put<Product>(url, product, { headers: headers })
            .pipe(
                tap(() => console.log('updateProduct: ' + product.id)),
                // Return the product on an update
                map(() => product),
                catchError(this.handleError)
            );
    }

    createProduct(product: Product): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        product.id = null; //! Angular-in-memory-web-api ==> To assign a new unique id to a created item,we must pass it a product object with an id of null
        return this.http.post<Product>(this.productsUrl, product, { headers: headers })
            .pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteProduct(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<Product>(url, { headers: headers })
          .pipe(
            tap(data => console.log('deleteProduct: ' + id)),
            catchError(this.handleError)
          );
      }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

    private initializeProduct(): Product {
        // Return an initialized object
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [''],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null,
            category: null
        };
    }
}