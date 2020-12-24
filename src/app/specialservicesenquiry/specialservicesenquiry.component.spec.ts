import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialservicesenquiryComponent } from './specialservicesenquiry.component';

describe('SpecialservicesenquiryComponent', () => {
  let component: SpecialservicesenquiryComponent;
  let fixture: ComponentFixture<SpecialservicesenquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialservicesenquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialservicesenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
