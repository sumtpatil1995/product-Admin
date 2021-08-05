import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './product-details.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      declarations: [ProductDetailsComponent],
      providers: [ToastrService],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductDetailsComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;

    });
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ProductDetailsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as productId '-1'`, () => {
    expect(component.productId).toEqual(-1);
  });


  it(`should set isFormSubmitted to true`, () => {
    component.onFormSubmit();
    expect(component.isFormSubmitted).toBeTruthy();
  });


  it(`form should be invalid`, () => {
    component.productDetailsForm.controls['productName'].setValue('');
    component.productDetailsForm.controls['productDescription'].setValue('');
    component.productDetailsForm.controls['productQuantity'].setValue('');
    component.productDetailsForm.controls['productPrice'].setValue('');
    expect(component.productDetailsForm.valid).toBeFalsy();
  });


  it(`form should be valid`, () => {
    component.productDetailsForm.controls['productName'].setValue('product 1');
    component.productDetailsForm.controls['productDescription'].setValue('test product desc');
    component.productDetailsForm.controls['productQuantity'].setValue(20);
    component.productDetailsForm.controls['productPrice'].setValue(500);
    expect(component.productDetailsForm.valid).toBeTruthy();
  });


});
