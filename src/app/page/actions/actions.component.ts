import { Component } from '@angular/core';
import { IAction } from 'src/app/shared/interfaces/action';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  public actions: IAction[] = [];
  constructor(private db: DbDataService){}

  ngOnInit(): void{
    this.db.API = environment.API.actions;
    this.getActions();
  }

  getActions(): void {
    this.db.getAll().subscribe({
      next: data => {
        this.actions = data as IAction[];
      },
      error: e => {
        console.error(e)
      }
    })
  }
}
