import { Component, OnInit } from '@angular/core';

import { Product, ProductResolved } from './product';
import { ActivatedRoute, Router } from '@angular/router';
// import { ProductService } from './product.service';

@Component({
  //selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: Product;
  errorMessage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private productService: ProductService
  ) { }

  // ngOnInit() {
  //   let id = +this.route.snapshot.paramMap.get('id');
  //   this.pageTitle += `: ${id}`;
  //   this.product = {
  //     productId: id,
  //     productName: 'Leaf Rake',
  //     productCode: 'GDN-0011',
  //     releaseDate: 'March 19,2016',
  //     price: 19.95,
  //     description: 'Leaf rake with 48-inch wooden handle.',
  //     starRating: 3.2,
  //     imageUrl: "https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
  //   }
  // }

  //! == Not use Resolver
  // ngOnInit() {
  //   const param = this.route.snapshot.paramMap.get('id');
  //   if (param) {
  //     const id = +param; //*==> Use + sign to cast it to a number
  //     this.getProduct(id);
  //   }
  // }

  // getProduct(id: number) {
  //   this.productService.getProduct(id).subscribe(
  //     product => this.product = product,
  //     error => this.errorMessage = <any>error);
  // }

  //! == Use Resolver (Reading with Snapshot)
  ngOnInit(): void {
    const resolvedData: ProductResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  onBack():void{
    this.router.navigate(['/products']);
  }

}
