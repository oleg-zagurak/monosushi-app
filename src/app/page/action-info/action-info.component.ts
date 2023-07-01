import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAction } from 'src/app/shared/interfaces/action';

@Component({
  selector: 'app-action-info',
  templateUrl: './action-info.component.html',
  styleUrls: ['./action-info.component.scss']
})
export class ActionInfoComponent {
  constructor(private activatedRoute: ActivatedRoute) { }
  public action!: IAction;
  public description: string[] = [];
  ngOnInit(): void {
    const subscription = this.activatedRoute.data.subscribe({
      next: ({ action }) => {
        this.action = action;
        this.description = this.action.description.split('.');
        if (!this.description[this.description.length - 1]) this.description.splice((this.description.length - 1), 1);
      },
      error: e => {
        console.error(e);
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }
}
