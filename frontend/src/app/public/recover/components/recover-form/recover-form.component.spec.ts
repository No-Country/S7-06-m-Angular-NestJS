import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverFormComponent } from './recover-form.component';

describe('RecoverFormComponent', () => {
  let component: RecoverFormComponent;
  let fixture: ComponentFixture<RecoverFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
