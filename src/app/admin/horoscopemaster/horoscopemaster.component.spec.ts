import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroscopemasterComponent } from './horoscopemaster.component';

describe('HoroscopemasterComponent', () => {
  let component: HoroscopemasterComponent;
  let fixture: ComponentFixture<HoroscopemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoroscopemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoroscopemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
