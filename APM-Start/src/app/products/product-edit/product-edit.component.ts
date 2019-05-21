import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../products/product.service';
import { Subscription } from 'rxjs';
import { NumberValidators } from '../../shared/number.validator';
import { Product, ProductResolved } from '../product';


@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  private sub: Subscription;
  errorMessage: string;
  product: Product;
  pageTitle = 'Product Edit';
  displayMessage: { [key: string]: string } = {};
  private dataIsValid: { [key: string]: boolean } = {};
  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: '',
      category: ''
    });

    // ! === Read the product Id from the route parameter
    // ! == Not use Resolver 
    //* == Snapshot Method ==> To read the parameters only once
    // let id = +this.route.snapshot.paramMap.get('id');
    //* == Observable Method ==> To watch for parameter changes
    // this.sub = this.route.paramMap.subscribe(
    //   params => {
    //     const id = +params.get('id');
    //     this.getProduct(id);
    //   }
    // );

    // ! == Use Resolver (Reading with Observable)
    this.route.data.subscribe(data => {
      const resolvedData: ProductResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onProductRetrieved(resolvedData.product);
    })
  }

  onProductRetrieved(product: Product): void {

    // if (this.productForm) {
    //   this.productForm.reset();
    // }
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description,
      category: this.product.category
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }


  //! === To unsubscribe from an observable, we need to have subscription, so we define private property 'sub' that retains the reference to the subscription so we can unsubscript from it
  //* Use when non-Resolver
  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   this.sub.unsubscribe();
  // }

  //* Use when non-Resolver
  // getProduct(id: number): void {
  //   this.productService.getProduct(id)
  //     .subscribe(
  //       (product: Product) => this.displayProduct(product),
  //       (error: any) => this.errorMessage = <any>error
  //     );
  // }

  // displayProduct(product: Product): void {
  //   if (this.productForm) {
  //     this.productForm.reset();
  //   }
  //   this.product = product;

  //   if (this.product.id === 0) {
  //     this.pageTitle = 'Add Product';
  //   } else {
  //     this.pageTitle = `Edit Product: ${this.product.productName}`;
  //   }
  //   // Update the data on the form
  //   this.productForm.patchValue({
  //     productName: this.product.productName,
  //     productCode: this.product.productCode,
  //     starRating: this.product.starRating,
  //     description: this.product.description
  //   });
  //   this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  // }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p)
            .subscribe(
              () => this.onSaveComplete(),
              // () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.productService.updateProduct(p)
            .subscribe(
              () => this.onSaveComplete(),
              // () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
              (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(),
            // () => this.onSaveComplete(`${this.product.productName} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  //TODO: Show mark when tab has validation error
  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }
  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.product.category &&
      this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }

  onSaveComplete(): void {
    // if(message){
    //   this.messageService.addMessage(message);
    // }
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }

}
