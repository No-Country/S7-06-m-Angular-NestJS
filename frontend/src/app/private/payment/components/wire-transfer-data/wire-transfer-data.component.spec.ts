import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireTransferDataComponent } from './wire-transfer-data.component';

describe('WireTransferDataComponent', () => {
  let component: WireTransferDataComponent;
  let fixture: ComponentFixture<WireTransferDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WireTransferDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WireTransferDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
