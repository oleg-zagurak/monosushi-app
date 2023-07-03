import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizationComponent],
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: AuthService, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open auth modal', () => {
    spyOn(component, 'showAuth').and.callThrough();
    spyOn(component.dialog, 'open');
    component.showAuth();
    expect(component.dialog.open).toHaveBeenCalled;
    component.isLogged = true;
    component.showAuth();
    expect(component.dialog.open).toHaveBeenCalledTimes(1);
  });

  it('should show popup navigation bar', () => {
    spyOn(component, 'showSecNav').and.callThrough();
    component.showSecNav();
    expect(component.state).toBe(component.state);
    component.isLogged = true;
    component.showSecNav();
    expect(component.state).toBe(true);
    component.showSecNav();
    expect(component.state).toBe(false);
  });
});
