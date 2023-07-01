import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBasketComponent } from './header-basket.component';

describe('HeaderBasketComponent', () => {
  let component: HeaderBasketComponent;
  let fixture: ComponentFixture<HeaderBasketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderBasketComponent]
    });
    fixture = TestBed.createComponent(HeaderBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
