import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Button';     // Texto del botón
  @Input() type: string = 'button';      // Tipo de botón (submit, reset, etc.)
  @Input() disabled: boolean = false;    // Habilitado o no
  @Input() class: string = '';           // Clase CSS que se pasará al botón
  @Input() icon: string | null = null;

  constructor() {}
}
