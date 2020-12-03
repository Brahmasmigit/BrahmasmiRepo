import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryheaderComponent } from './enquiryheader.component';

describe('EnquiryheaderComponent', () => {
  let component: EnquiryheaderComponent;
  let fixture: ComponentFixture<EnquiryheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
