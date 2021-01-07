import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserslotbookingPage } from './userslotbooking.page';

describe('UserslotbookingPage', () => {
  let component: UserslotbookingPage;
  let fixture: ComponentFixture<UserslotbookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserslotbookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserslotbookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
