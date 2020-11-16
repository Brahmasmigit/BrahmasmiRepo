import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreregistrationComponent } from './storeregistration.component';

describe('StoreregistrationComponent', () => {
  let component: StoreregistrationComponent;
  let fixture: ComponentFixture<StoreregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
