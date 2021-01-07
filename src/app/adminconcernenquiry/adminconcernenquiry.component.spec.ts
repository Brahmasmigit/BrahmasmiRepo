import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { adminconcernenquiryComponent } from './adminconcernenquiry.component';

describe('AdminconcernenquiryComponent', () => {
  let component: adminconcernenquiryComponent;
  let fixture: ComponentFixture<adminconcernenquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ adminconcernenquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(adminconcernenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
