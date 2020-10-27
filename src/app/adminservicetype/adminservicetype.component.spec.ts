import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminservicetypeComponent } from './adminservicetype.component';

describe('AdminservicetypeComponent', () => {
  let component: AdminservicetypeComponent;
  let fixture: ComponentFixture<AdminservicetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminservicetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminservicetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
