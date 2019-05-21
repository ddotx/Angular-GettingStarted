import { Component, OnInit } from "@angular/core";
import { IProduct, Product } from "./product";
import { ProductService } from "./product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;

  //listFilter: string = 'cart';
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  // filteredProducts: IProduct[] = [];
  filteredProducts: Product[] = [];
  // products: IProduct[] = [];
  products: Product[] = [];

  //The class constructor is a function that is executed when the component is first initialized
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
    ) {
    //this.filteredProducts = this.products;
    //this.listFilter = 'cart';
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    // this.products = this.productService.getProducts();

    this._listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

    //! 1 - Call the subscribe method of the returned observable
    //! 2 - Provide a function to handle an emitted item (normally assigns a property to the returned JSON object)

    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error //casting operator
    )

  }
} 