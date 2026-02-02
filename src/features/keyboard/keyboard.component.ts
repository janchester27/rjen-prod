import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {

  keys: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'Delete'];

  @Output() keyPress: EventEmitter<string> = new EventEmitter<string>();

  onKeyClick(key: string): void {
    this.keyPress.emit(key);
  }

}
