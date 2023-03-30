import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCarruselComponent } from './products-carrusel.component';

describe('ProductsCarruselComponent', () => {
  let component: ProductsCarruselComponent;
  let fixture: ComponentFixture<ProductsCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsCarruselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
