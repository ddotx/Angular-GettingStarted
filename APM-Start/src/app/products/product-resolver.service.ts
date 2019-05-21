import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved>{
    const id = route.paramMap.get('id');

    //! === === === === === === === ===
     //TODO: Resolver Error Handling ==> Use Resolved data

     if(isNaN(+id)) {
       const message = `Product id was not a number: ${id}`;
       console.error(message);
       return of({product: null, error: message});
       };

       //! Real App will not use
       //*== 1. Return false
       //*== 2. Return null
       //*== 3. Navigate to error page
       //! But HAVE USE
       //*== Service | Optional parameter | Custom error handler | ***Resolved data
    //  }
    //! === === === === === === === ===

    return this.productService.getProduct(+id)
    .pipe(
      map(product => ({product: product})),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({product: null, error: message});
      })
    )
  }
}
