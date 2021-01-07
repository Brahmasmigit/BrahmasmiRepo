import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutbrahmasmiComponent } from './aboutbrahmasmi.component';

describe('AboutbrahmasmiComponent', () => {
  let component: AboutbrahmasmiComponent;
  let fixture: ComponentFixture<AboutbrahmasmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutbrahmasmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutbrahmasmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
