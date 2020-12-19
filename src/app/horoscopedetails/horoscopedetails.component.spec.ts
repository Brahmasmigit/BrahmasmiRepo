import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroscopedetailsComponent } from './horoscopedetails.component';

describe('HoroscopedetailsComponent', () => {
  let component: HoroscopedetailsComponent;
  let fixture: ComponentFixture<HoroscopedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoroscopedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoroscopedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
