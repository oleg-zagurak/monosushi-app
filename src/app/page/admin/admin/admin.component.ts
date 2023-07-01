import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  
  constructor(private auth: AuthService) { }
  logout(): void {
    this.auth.logout()
  }

}
