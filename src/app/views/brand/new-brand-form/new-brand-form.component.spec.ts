import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBrandFormComponent } from './new-brand-form.component';

describe('NewBrandFormComponent', () => {
  let component: NewBrandFormComponent;
  let fixture: ComponentFixture<NewBrandFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBrandFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
