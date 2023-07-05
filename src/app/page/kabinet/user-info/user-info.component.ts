import { Component } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  public saveModal = false;
  public user: IUser;

  constructor(){
    this.user = JSON.parse(localStorage.getItem('currentUser') as string);
  }
  openSave(): void{
        this.saveModal = !this.saveModal;
  }
}
