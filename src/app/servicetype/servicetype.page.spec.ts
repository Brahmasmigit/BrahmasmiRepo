import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicetypePage } from './servicetype.page';

describe('ServicetypePage', () => {
  let component: ServicetypePage;
  let fixture: ComponentFixture<ServicetypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicetypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicetypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
