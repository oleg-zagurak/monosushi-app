import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthService, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.registerForm.setValue({
      name: 'string',
      surname: 'string',
      tel: 'string',
      email: 'string',
      password: 'string',
      passwordConfirmation: 'string',
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check password incorrection', () => {
    spyOn(component, 'checkPassword').and.callThrough();
    component.checkPassword();
    expect(component.passwordError).toBe(false);
    component.registerForm.patchValue({
      password: 'asd'
    })
    component.checkPassword();
    expect(component.passwordError).withContext(`error value ${component.passwordError}`).toBe(true);
  });
});
