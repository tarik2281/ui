import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewsletterComponent } from './register-newsletter.component';

describe('RegisterNewsletterComponent', () => {
  let component: RegisterNewsletterComponent;
  let fixture: ComponentFixture<RegisterNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
