import { Component } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  public saveModal = false;
  openSavePopup(): void{
    this.saveModal = !this.saveModal;
  }
}
