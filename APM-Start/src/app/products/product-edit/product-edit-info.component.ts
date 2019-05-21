import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NumberValidators } from 'src/app/shared/number.validator';

@Component({
  selector: 'pm-product-edit-info',
  templateUrl: './product-edit-info.component.html',
  styleUrls: ['./product-edit-info.component.css']
})
export class ProductEditInfoComponent implements OnInit {

  productForm: FormGroup;
  product: Product;
  displayMessage: { [key: string]: string } = {};
  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }
  
  constructor(
    private route:ActivatedRoute,
    private fb: FormBuilder
    ) { }

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

    this.route.parent.data.subscribe(data => {
      this.product = data['resolvedData'].product;
    })
  }

}
