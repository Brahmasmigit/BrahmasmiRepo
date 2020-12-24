import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminonboardingComponent } from './adminonboarding.component';

describe('AdminonboardingComponent', () => {
  let component: AdminonboardingComponent;
  let fixture: ComponentFixture<AdminonboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminonboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminonboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
