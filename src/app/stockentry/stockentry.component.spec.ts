import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockentryComponent } from './stockentry.component';

describe('StockentryComponent', () => {
  let component: StockentryComponent;
  let fixture: ComponentFixture<StockentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
