import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  public acardion: boolean[] = [false, false, false, false];
  open(item: HTMLDivElement): void{
    let index = Number(item.dataset['index']);
    this.acardion[index] = !this.acardion[index];
    if(this.acardion[index]){
      item.style.height = item.scrollHeight + 'px';
    } else {
      item.style.height = 0 + 'px';
    }
  }
}
