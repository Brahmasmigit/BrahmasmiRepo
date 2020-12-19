import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuspiciousdatesComponent } from './auspiciousdates.component';

describe('AuspiciousdatesComponent', () => {
  let component: AuspiciousdatesComponent;
  let fixture: ComponentFixture<AuspiciousdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuspiciousdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuspiciousdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
