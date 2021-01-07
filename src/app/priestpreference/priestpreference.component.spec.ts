import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriestpreferenceComponent } from './priestpreference.component';

describe('PriestpreferenceComponent', () => {
  let component: PriestpreferenceComponent;
  let fixture: ComponentFixture<PriestpreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriestpreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriestpreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
