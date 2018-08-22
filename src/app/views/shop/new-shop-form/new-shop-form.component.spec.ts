import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShopFormComponent } from './new-shop-form.component';

describe('NewShopFormComponent', () => {
  let component: NewShopFormComponent;
  let fixture: ComponentFixture<NewShopFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShopFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
