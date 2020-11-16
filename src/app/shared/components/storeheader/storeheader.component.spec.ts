import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreheaderComponent } from './storeheader.component';

describe('StoreheaderComponent', () => {
  let component: StoreheaderComponent;
  let fixture: ComponentFixture<StoreheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
