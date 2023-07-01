import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { IUser, ROLE } from 'src/app/shared/interfaces/user';
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
  public isLogged = false;
  public isAdmin = false;
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) { }
  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.closeOnNavigate();
      }
    })
    this.auth.logoutSubject.subscribe(() => {
      this.resetOnLogout();
    })
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
      next: (userList) => {
        if (userList.length === 0) {
          this.loginError = true;
        } else {
          const user = userList[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isLogged = true;
          if(user.role === ROLE.USER) this.router.navigateByUrl('/kabinet');
          if(user.role === ROLE.ADMIN) {
            this.isAdmin = true;
            this.router.navigateByUrl('/admin');
          }
        }
        this.disabledOnLoad = false;
        console.log(userList);
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        subscription.unsubscribe()
      }
    })
  }
  logout(): void{
    this.auth.logout();
  }

  resetOnLogout(): void{
    this.isAdmin = false;
    this.loginError = false;
    this.isLogged = false;
    this.state = false;
  }
  
  showReg(): void {
    this.regStatus = !this.regStatus;
  }

  showAuth(): void {
    if(!this.isLogged) this.showModal = !this.showModal;
  }

  showSecNav(): void{
    if(this.isLogged){
      this.state = !this.state;
    }
  }
  
  close(event: Event) {
    let target: HTMLElement = event.target as HTMLElement;
    if (target.classList.contains('cancel')) {
      this.regStatus = false;
      this.showModal = false;
    }
  }

  closeOnNavigate(): void{
    this.state = false;
    this.regStatus = false;
    this.showModal = false;
    this.loginForm.reset();
    this.registerForm.reset();
  }
}
