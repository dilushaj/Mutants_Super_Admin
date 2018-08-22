import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectReasonsComponent } from './reject-reasons.component';

describe('RejectReasonsComponent', () => {
  let component: RejectReasonsComponent;
  let fixture: ComponentFixture<RejectReasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectReasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
