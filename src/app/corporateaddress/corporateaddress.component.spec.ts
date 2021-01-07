import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateaddressComponent } from './corporateaddress.component';

describe('CorporateaddressComponent', () => {
  let component: CorporateaddressComponent;
  let fixture: ComponentFixture<CorporateaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
