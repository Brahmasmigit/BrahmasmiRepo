import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserbillingPage } from './userbilling.page';

describe('UserbillingPage', () => {
  let component: UserbillingPage;
  let fixture: ComponentFixture<UserbillingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserbillingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserbillingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
