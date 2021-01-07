import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductservicemappingComponent } from './productservicemapping.component';

describe('ProductservicemappingComponent', () => {
  let component: ProductservicemappingComponent;
  let fixture: ComponentFixture<ProductservicemappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductservicemappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductservicemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
