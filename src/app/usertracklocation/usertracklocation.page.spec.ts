import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsertracklocationPage } from './usertracklocation.page';

describe('UsertracklocationPage', () => {
  let component: UsertracklocationPage;
  let fixture: ComponentFixture<UsertracklocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertracklocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsertracklocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
