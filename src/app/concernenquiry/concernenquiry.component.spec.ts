import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernenquiryComponent } from './concernenquiry.component';

describe('ConcernenquiryComponent', () => {
  let component: ConcernenquiryComponent;
  let fixture: ComponentFixture<ConcernenquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcernenquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
