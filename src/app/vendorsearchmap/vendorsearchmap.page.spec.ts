import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorsearchmapPage } from './vendorsearchmap.page';

describe('VendorsearchmapPage', () => {
  let component: VendorsearchmapPage;
  let fixture: ComponentFixture<VendorsearchmapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsearchmapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorsearchmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
