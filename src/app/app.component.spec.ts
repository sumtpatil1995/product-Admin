import { RouterModule, Routes } from '@angular/router';

import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {

  const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'dashboard',
    },
    {
      path: "dashboard",
      component: ProductsListComponent
    },
    {
      path: "product",
      component: ProductDetailsComponent
    },
    {
      path: "product/:id",
      component: ProductDetailsComponent
    }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule.forRoot(routes)
      ],
      declarations: [
        AppComponent,
        ProductsListComponent,
        ProductDetailsComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'productAdmin'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('productAdmin');
  });
});
