import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminspecialservicesenquiryComponent } from './adminspecialservicesenquiry.component';

describe('AdminspecialservicesenquiryComponent', () => {
  let component: AdminspecialservicesenquiryComponent;
  let fixture: ComponentFixture<AdminspecialservicesenquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminspecialservicesenquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminspecialservicesenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
