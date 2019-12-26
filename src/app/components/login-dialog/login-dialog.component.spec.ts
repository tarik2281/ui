import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDialogComponent } from './login-dialog.component';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      declarations: [ LoginDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
