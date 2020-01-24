import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanktypeComponent } from './banktype.component';

describe('BanktypeComponent', () => {
  let component: BanktypeComponent;
  let fixture: ComponentFixture<BanktypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanktypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanktypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
