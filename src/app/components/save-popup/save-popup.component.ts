import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-save-popup',
  templateUrl: './save-popup.component.html',
  styleUrls: ['./save-popup.component.scss']
})
export class SavePopupComponent {
  @Input() show = false;
  @Output() hide = new EventEmitter<void>();
  close(): void{
    this.show = false;
    this.hide.emit();
  }
  closeOnBg(e: Event): void{
    let elem = e.target as HTMLElement;
    if(elem.id === 'bg'){
      this.close();
    }
  }
}
