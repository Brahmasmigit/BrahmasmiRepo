import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmeetingComponent } from './adminmeeting.component';

describe('AdminmeetingComponent', () => {
  let component: AdminmeetingComponent;
  let fixture: ComponentFixture<AdminmeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
