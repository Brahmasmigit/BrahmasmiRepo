import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsercartPage } from './usercart.page';

describe('UsercartPage', () => {
  let component: UsercartPage;
  let fixture: ComponentFixture<UsercartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsercartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
