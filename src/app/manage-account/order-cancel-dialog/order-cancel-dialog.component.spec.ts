import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancelDialogComponent } from 'src/app/manage-account/order-cancel-dialog/order-cancel-dialog.component';

describe('OrderCancelDialogComponent', () => {
  let component: OrderCancelDialogComponent;
  let fixture: ComponentFixture<OrderCancelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCancelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
