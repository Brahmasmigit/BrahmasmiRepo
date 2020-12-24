import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoojasubscriptionformComponent } from './poojasubscriptionform.component';

describe('PoojasubscriptionformComponent', () => {
  let component: PoojasubscriptionformComponent;
  let fixture: ComponentFixture<PoojasubscriptionformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoojasubscriptionformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoojasubscriptionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
