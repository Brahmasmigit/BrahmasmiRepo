import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendordashboardPage } from './vendordashboard.page';

describe('VendordashboardPage', () => {
  let component: VendordashboardPage;
  let fixture: ComponentFixture<VendordashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendordashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendordashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
