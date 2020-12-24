import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpoojasubscriptionformComponent } from './adminpoojasubscriptionform.component';

describe('AdminpoojasubscriptionformComponent', () => {
  let component: AdminpoojasubscriptionformComponent;
  let fixture: ComponentFixture<AdminpoojasubscriptionformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpoojasubscriptionformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpoojasubscriptionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
