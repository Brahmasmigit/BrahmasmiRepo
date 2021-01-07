import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetaddressfromlatlngComponent } from './getaddressfromlatlng.component';

describe('GetaddressfromlatlngComponent', () => {
  let component: GetaddressfromlatlngComponent;
  let fixture: ComponentFixture<GetaddressfromlatlngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetaddressfromlatlngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetaddressfromlatlngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
