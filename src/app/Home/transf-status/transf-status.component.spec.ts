import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfStatusComponent } from './transf-status.component';

describe('TransfStatusComponent', () => {
  let component: TransfStatusComponent;
  let fixture: ComponentFixture<TransfStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
