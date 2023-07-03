import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsComponent } from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsComponent]
    });
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle accordion state and set height of the item', () => {
    const index = 0;
    const item = document.createElement('div');
    item.dataset['index'] = index.toString();
    spyOnProperty(item, 'scrollHeight', 'get').and.returnValue(200);
    
    component.open(item);

    expect(component.acardion[index]).toBe(true);
    expect(item.style.height).toBe('200px');

    component.open(item);

    expect(component.acardion[index]).toBe(false);
    expect(item.style.height).toBe('0px');
  });
});