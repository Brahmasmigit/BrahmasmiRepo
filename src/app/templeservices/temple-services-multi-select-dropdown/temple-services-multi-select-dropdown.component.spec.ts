import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleServicesMultiSelectDropdownComponent } from './temple-services-multi-select-dropdown.component';

describe('TempleServicesMultiSelectDropdownComponent', () => {
  let component: TempleServicesMultiSelectDropdownComponent;
  let fixture: ComponentFixture<TempleServicesMultiSelectDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempleServicesMultiSelectDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempleServicesMultiSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
