import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsService } from './product-details.service';
import { TestBed } from '@angular/core/testing';

describe('ProductDetailsService', () => {
  let service: ProductDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ProductDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
