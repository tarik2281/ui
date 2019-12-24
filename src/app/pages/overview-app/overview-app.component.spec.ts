import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewAppComponent } from './overview-app.component';

describe('OverviewAppComponent', () => {
  let component: OverviewAppComponent;
  let fixture: ComponentFixture<OverviewAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
