import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorcityComponent } from './vendorcity.component';

describe('VendorcityComponent', () => {
  let component: VendorcityComponent;
  let fixture: ComponentFixture<VendorcityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorcityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorcityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
