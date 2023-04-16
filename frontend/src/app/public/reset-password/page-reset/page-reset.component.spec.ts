import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageResetComponent } from './page-reset.component';

describe('PageResetComponent', () => {
  let component: PageResetComponent;
  let fixture: ComponentFixture<PageResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
