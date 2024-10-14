import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string = 'Button';     // Texto del botón
  @Input() type: string = 'button';      // Tipo de botón (submit, reset, etc.)
  @Input() disabled: boolean = false;    // Habilitado o no

  constructor() {}
}
