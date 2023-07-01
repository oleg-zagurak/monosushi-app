import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  public regStatus = false;
  public state = false;
  public showModal = false;
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public loginError = false;
  public disabledOnLoad = false;
  constructor(private fb: FormBuilder, private auth: AuthService) { }
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
      agreement: [null, [Validators.required]],
    })
  }

  login(): void {
    this.disabledOnLoad = true;
    const subscription = this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (user) => {
        if (!user) {
          this.loginError = true;
        } else {
          
        }
        this.disabledOnLoad = false;
        console.log(user);
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        subscription.unsubscribe()
      }
    })
  }
  private redirect(): void {

  }
  showReg(): void {
    this.regStatus = !this.regStatus;
  }
  showAuth(): void {
    this.showModal = !this.showModal
  }
  close(event: Event) {
    let target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('cancel')) {
      this.regStatus = false;
      this.showModal = false;
    }
  }
}
