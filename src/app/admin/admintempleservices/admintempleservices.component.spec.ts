import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintempleservicesComponent } from './admintempleservices.component';

describe('AdmintempleservicesComponent', () => {
  let component: AdmintempleservicesComponent;
  let fixture: ComponentFixture<AdmintempleservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintempleservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintempleservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
