import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatDialogModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch field "state" value', () => {
    component.close();
    expect(component.state).withContext('turn to true').toBe(true);
    component.close();
    expect(component.state).withContext('turn to false').toBe(false);
  });

  it('should switch header element className "active"', () => {
    let nativeElement: HTMLElement = fixture.nativeElement;
    let header: HTMLElement = nativeElement.querySelector('.header') as HTMLElement;
    
    component.close();
    fixture.detectChanges();
    expect(header.classList.contains('active')).withContext('header element has "active" className').toBe(true);

    component.close();
    fixture.detectChanges();
    expect(header.classList.contains('active')).withContext('header element hasn\'t "active" className').toBe(false);
  });
});
