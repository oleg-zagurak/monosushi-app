import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle moreText property', () => {
    const item = document.createElement('div');
    expect(component.moreText).toBeFalse();

    component.show(item);

    expect(component.moreText).toBeTrue();

    component.show(item);

    expect(component.moreText).toBeFalse();
  });

  it('should update article height', () => {
    const item = document.createElement('div');
    spyOnProperty(item, 'scrollHeight', 'get').and.returnValue(200);
    
    component.moreText = false;
    component.show(item);

    expect(component.moreText).toBe(true);
    expect(item.style.height).toBe('200px');

    component.moreText = true;
    component.show(item);

    expect(component.moreText).toBe(false);
    expect(item.style.height).toBe('0px');
  });
});
