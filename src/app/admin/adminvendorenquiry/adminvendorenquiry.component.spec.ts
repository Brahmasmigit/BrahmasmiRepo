import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminvendorenquiryComponent } from './adminvendorenquiry.component';

describe('AdminvendorenquiryComponent', () => {
  let component: AdminvendorenquiryComponent;
  let fixture: ComponentFixture<AdminvendorenquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminvendorenquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminvendorenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
