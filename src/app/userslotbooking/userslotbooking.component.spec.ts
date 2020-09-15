import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserslotbookingComponent } from './userslotbooking.component';

describe('UserslotbookingComponent', () => {
  let component: UserslotbookingComponent;
  let fixture: ComponentFixture<UserslotbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserslotbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserslotbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
