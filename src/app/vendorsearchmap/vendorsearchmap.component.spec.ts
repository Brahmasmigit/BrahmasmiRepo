import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsearchmapComponent } from './vendorsearchmap.component';

describe('VendorsearchmapComponent', () => {
  let component: VendorsearchmapComponent;
  let fixture: ComponentFixture<VendorsearchmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsearchmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsearchmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
