import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyReceiptComponent } from './money-receipt.component';

describe('MoneyReceiptComponent', () => {
  let component: MoneyReceiptComponent;
  let fixture: ComponentFixture<MoneyReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
