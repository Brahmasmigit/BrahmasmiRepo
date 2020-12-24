import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { admincommunityservicesComponent } from './admincommunityservices.component';

describe('AdmincommunityservicesComponent', () => {
  let component: admincommunityservicesComponent;
  let fixture: ComponentFixture<admincommunityservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ admincommunityservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(admincommunityservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
