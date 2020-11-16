import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserproductorderdetailsComponent } from './userproductorderdetails.component';

describe('UserproductorderdetailsComponent', () => {
  let component: UserproductorderdetailsComponent;
  let fixture: ComponentFixture<UserproductorderdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserproductorderdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserproductorderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
