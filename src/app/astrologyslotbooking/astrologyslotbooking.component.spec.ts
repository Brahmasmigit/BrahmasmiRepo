import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologyslotbookingComponent } from './astrologyslotbooking.component';

describe('AstrologyslotbookingComponent', () => {
  let component: AstrologyslotbookingComponent;
  let fixture: ComponentFixture<AstrologyslotbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstrologyslotbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstrologyslotbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
