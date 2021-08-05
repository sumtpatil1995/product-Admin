import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Product } from '../models';
import { ProductDetailsService } from '../services/product-details.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  productList: Array<Product> = [];
  public dialogRef!: MatDialogRef<any>;
  constructor(
    private productService: ProductDetailsService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.fetchProductList().subscribe(
      (apiResponse) => {
        console.log(apiResponse);
        this.productList = apiResponse;
      },
      (error) => {
        this.toastr.error('Error!!!', `Something went wrong please try again.`);
      }
    );
  }



  deleteProduct(product: Product) {
    this.productService.removeProduct(product.id).subscribe(
      (apiResponse) => {
        this.toastr.success('', `${product.productName} Deleted successfully!!!`);
        setTimeout(() => {
          this.getProductList();
        }, 1500);
      },
      (error) => {
        this.toastr.error('Error!!!', `Something went wrong please try again.`);
      }
    );
  }

  updateProduct(id: number) {
    this.router.navigate([`/product/${id}`]);
  }


  openConfirmationDialog(product: Product) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      height: '175px',
      width: '600px',
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do confirmation actions
        this.deleteProduct(product);
      }
    });
  }
}
