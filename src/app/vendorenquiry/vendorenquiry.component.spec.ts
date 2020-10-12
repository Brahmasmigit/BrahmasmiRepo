import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorenquiryComponent } from './vendorenquiry.component';

describe('VendorenquiryComponent', () => {
  let component: VendorenquiryComponent;
  let fixture: ComponentFixture<VendorenquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorenquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
