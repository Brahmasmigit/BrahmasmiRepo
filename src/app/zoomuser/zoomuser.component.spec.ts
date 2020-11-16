import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomuserComponent } from './zoomuser.component';

describe('ZoomuserComponent', () => {
  let component: ZoomuserComponent;
  let fixture: ComponentFixture<ZoomuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
