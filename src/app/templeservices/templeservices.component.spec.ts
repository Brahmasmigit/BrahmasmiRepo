import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleservicesComponent } from './templeservices.component';

describe('TempleservicesComponent', () => {
  let component: TempleservicesComponent;
  let fixture: ComponentFixture<TempleservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempleservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempleservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
