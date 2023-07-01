import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  public state = false;
  public isLogged = false;
  public isAdmin = false;
  constructor(private dialog: MatDialog,
    private auth: AuthService,
    private router: Router) { }
    
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.closeOnNavigate();
      }
    })
    this.auth.authSubject.subscribe((mode: boolean) => {
      if (mode) {
        this.isAdmin = this.auth.isAdmin;
        this.isLogged = this.auth.isLogged;
      } else {
        this.resetOnLogout();
      }
    })
  }

  logout(): void {
    this.auth.logout();
  }

  resetOnLogout(): void {
    this.isAdmin = false;
    this.isLogged = false;
    this.state = false;
  }

  showAuth(): void {
    if (!this.isLogged) {
      this.dialog.open(AuthDialogComponent, {
        backdropClass: 'bg',
        panelClass: 'wrapper',
        autoFocus: false
      })
    }
  }

  showSecNav(): void {
    if (this.isLogged) {
      this.state = !this.state;
    }
  }

  closeOnNavigate(): void {
    this.state = false;
  }
}
