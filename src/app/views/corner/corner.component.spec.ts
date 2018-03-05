import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CornerComponent } from './corner.component';

describe('CornerComponent', () => {
  let component: CornerComponent;
  let fixture: ComponentFixture<CornerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CornerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
