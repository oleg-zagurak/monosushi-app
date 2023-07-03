import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CallbackComponent} from "../../components/callback/callback.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public state = false;
  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
  }

  close(): void{
    this.state = !this.state;
  }

  showCallback(): void{
    this.dialog.open(CallbackComponent, {
      backdropClass: 'tel-bg',
      panelClass: 'tel-panel'
    })
  }
}
