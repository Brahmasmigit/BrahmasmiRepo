import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminservicedetailsComponent } from './adminservicedetails.component';

describe('AdminservicedetailsComponent', () => {
  let component: AdminservicedetailsComponent;
  let fixture: ComponentFixture<AdminservicedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminservicedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminservicedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
