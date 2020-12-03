import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminloyaltypointsComponent } from './adminloyaltypoints.component';

describe('AdminloyaltypointsComponent', () => {
  let component: AdminloyaltypointsComponent;
  let fixture: ComponentFixture<AdminloyaltypointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminloyaltypointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminloyaltypointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
