import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {
  public regStatus = false;
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public authError = false;
  public disabledOnLoad = false;
  public passwordError = false;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private dialog: MatDialogRef<AuthDialogComponent>) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      passwordConfirmation: [null, [Validators.required]],
    })
  }

  loginUser(): void {
    this.disabledOnLoad = true;
    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).then(() => {
      this.dialog.close();
    })
      .catch((e) => {
        console.error('catch error', e);
        this.authError = true;
        this.disabledOnLoad = false;
      })
  }

  registerUser(): void {
    this.disabledOnLoad = true;
    const { email, password} = this.registerForm.value;
    if (!this.passwordError && this.registerForm.valid) {
      this.auth.register(email, password, this.registerForm.value).then(() => {
        this.dialog.close()
      })
        .catch((e) => {
          console.log(e)
          this.disabledOnLoad = false;
        })
    } else {
      this.authError = true;
      this.disabledOnLoad = false;
    }
  }

  showReg(): void {
    this.regStatus = !this.regStatus;
    this.authError = false;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  checkPassword(): void{
    this.passwordError = this.password.value !== this.passwordConfirmation.value;
  }

  get password(): AbstractControl{
    return this.registerForm.controls['password']
  }

  get passwordConfirmation(): AbstractControl{
    return this.registerForm.controls['passwordConfirmation']
  }
}
