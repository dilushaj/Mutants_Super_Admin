import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInfoViewComponent } from './shop-info-view.component';

describe('ShopInfoViewComponent', () => {
  let component: ShopInfoViewComponent;
  let fixture: ComponentFixture<ShopInfoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopInfoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
