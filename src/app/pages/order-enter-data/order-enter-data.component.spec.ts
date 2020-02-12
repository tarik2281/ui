import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEnterDataComponent } from './order-enter-data.component';

describe('OrderEnterDataComponent', () => {
  let component: OrderEnterDataComponent;
  let fixture: ComponentFixture<OrderEnterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEnterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEnterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
