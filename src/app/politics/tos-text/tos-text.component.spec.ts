import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TosTextComponent } from 'src/app/politics/tos-text/tos-text.component';

describe('TosTextComponent', () => {
  let component: TosTextComponent;
  let fixture: ComponentFixture<TosTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TosTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TosTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
