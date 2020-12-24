import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationMultiSelectDownComponent } from './accommodation-multi-select-down.component';

describe('AccommodationMultiSelectDownComponent', () => {
  let component: AccommodationMultiSelectDownComponent;
  let fixture: ComponentFixture<AccommodationMultiSelectDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationMultiSelectDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationMultiSelectDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
