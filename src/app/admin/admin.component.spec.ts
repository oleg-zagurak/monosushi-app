import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { AuthService } from '../shared/services/auth/auth.service';
import { Auth } from '@angular/fire/auth';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      providers: [
        { provide: AuthService, useValue: {
          logout: (): void => {},
        }},
      ]
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout function', () => {
    const spyLogout = spyOn(component, 'logout');
    let element: HTMLElement = fixture.nativeElement;
    let button = element.querySelector('.btn') as HTMLElement;
    button.dispatchEvent(new MouseEvent('click'));
    
    expect(spyLogout.calls.count()).toBe(1);
  });
});
