import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincouponComponent } from './admincoupon.component';

describe('AdmincouponComponent', () => {
  let component: AdmincouponComponent;
  let fixture: ComponentFixture<AdmincouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
