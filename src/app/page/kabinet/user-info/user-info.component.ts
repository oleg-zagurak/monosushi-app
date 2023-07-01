import { Component } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  public saveModal = false;
  openSavePopup(): void{
    this.saveModal = !this.saveModal;
  }
}
