import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CornerListComponent } from './corner-list.component';

describe('CornerListComponent', () => {
  let component: CornerListComponent;
  let fixture: ComponentFixture<CornerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CornerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CornerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
