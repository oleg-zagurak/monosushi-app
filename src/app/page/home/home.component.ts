import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public moreText = false;
  constructor() { }

  ngOnInit(): void {
  }
  show(article: HTMLDivElement): void{
    this.moreText = !this.moreText;
    if(this.moreText && article){
      article.style.height = article.scrollHeight + 'px';
    } else {
      article.style.height = 0 + 'px';
    }
  }
}