import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginhomePage } from './loginhome.page';

describe('LoginhomePage', () => {
  let component: LoginhomePage;
  let fixture: ComponentFixture<LoginhomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginhomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
