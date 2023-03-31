import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadsCarruselComponent } from './notepads-carrusel.component';

describe('NotepadsCarruselComponent', () => {
  let component: NotepadsCarruselComponent;
  let fixture: ComponentFixture<NotepadsCarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotepadsCarruselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotepadsCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
