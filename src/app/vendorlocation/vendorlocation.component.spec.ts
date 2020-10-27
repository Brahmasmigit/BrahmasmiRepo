import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorlocationComponent } from './vendorlocation.component';

describe('VendorlocationComponent', () => {
  let component: VendorlocationComponent;
  let fixture: ComponentFixture<VendorlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
