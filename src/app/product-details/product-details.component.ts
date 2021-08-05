import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../models';
import { ProductDetailsService } from '../services/product-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productDetailsForm: FormGroup;
  isFormSubmitted: boolean = false;
  productId: number = -1;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductDetailsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    // initializing and assigned the form in the constructor
    this.productDetailsForm = this.fb.group({
      productName: ['', [Validators.required]],
      productDescription: [
        '',
        [Validators.required, Validators.maxLength(150)],
      ],
      productQuantity: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      // productCategory: ['', [Validators.required]]
    });

    this.route.params.subscribe((param) => {
      if (param.id) {
        this.productId = param.id;
        this.isEditMode = true;
        this.fetchProductDetails(this.productId);
      }
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get form() {
    return this.productDetailsForm.controls;
  }

  onFormSubmit() {
    this.isFormSubmitted = true;
    if (this.productDetailsForm.invalid) return;
    const product: Product = this.productDetailsForm.value;
    this.isEditMode
      ? this.updateTheProduct(product)
      : this.addProductToTheList(product);
  }

  fetchProductDetails(id: any) {
    this.productService.fetchProductList(id).subscribe(
      (apiResponse) => {
        this.productDetailsForm.setValue(apiResponse);
      },
      (error) => {
        this.toastr.error('Error!!!', `Something went wrong please try again.`);
      }
    );
  }

  addProductToTheList(product: Product) {
    this.productService.addProduct(product).subscribe(
      (apiResponse) => {
        this.toastr.success(
          'Added',
          `${product.productName} Added successfully!!!`
        );
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      (error) => {
        this.toastr.error('Error!!!', `Something went wrong please try again.`);
      }
    );
  }

  updateTheProduct(product: Product) {
    product['id'] = +this.productId;
    this.productService.updateProduct(product).subscribe(
      (apiResponse) => {
        this.toastr.success(
          'Updated',
          `${product.productName} updated successfully!!!`
        );
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      (error) => {
        this.toastr.error('Error!!!', `Something went wrong please try again.`);
      }
    );
  }
}
