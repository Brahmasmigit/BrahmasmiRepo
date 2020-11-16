import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproductdashboardComponent } from './adminproductdashboard.component';

describe('AdminproductdashboardComponent', () => {
  let component: AdminproductdashboardComponent;
  let fixture: ComponentFixture<AdminproductdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminproductdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminproductdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
