import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdProductComponent } from './id-product.component';

describe('IdProductComponent', () => {
  let component: IdProductComponent;
  let fixture: ComponentFixture<IdProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
