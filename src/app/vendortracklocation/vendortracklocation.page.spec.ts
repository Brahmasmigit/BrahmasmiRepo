import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendortracklocationPage } from './vendortracklocation.page';

describe('VendortracklocationPage', () => {
  let component: VendortracklocationPage;
  let fixture: ComponentFixture<VendortracklocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendortracklocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendortracklocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
