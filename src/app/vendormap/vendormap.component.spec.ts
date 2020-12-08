import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendormapComponent } from './vendormap.component';

describe('VendormapComponent', () => {
  let component: VendormapComponent;
  let fixture: ComponentFixture<VendormapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendormapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendormapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
