import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualvideoslotbookingComponent } from './virtualvideoslotbooking.component';

describe('VirtualvideoslotbookingComponent', () => {
  let component: VirtualvideoslotbookingComponent;
  let fixture: ComponentFixture<VirtualvideoslotbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualvideoslotbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualvideoslotbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
