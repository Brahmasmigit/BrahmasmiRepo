import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadvendorphotoComponent } from './uploadvendorphoto.component';

describe('UploadvendorphotoComponent', () => {
  let component: UploadvendorphotoComponent;
  let fixture: ComponentFixture<UploadvendorphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadvendorphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadvendorphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
