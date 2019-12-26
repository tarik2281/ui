import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSmarttubComponent } from './overview-smarttub.component';

describe('OverviewSmarttubComponent', () => {
  let component: OverviewSmarttubComponent;
  let fixture: ComponentFixture<OverviewSmarttubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSmarttubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSmarttubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
