import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() id: string = '';            // ID para el input
  @Input() name: string = '';          // Nombre del input (atributo 'name')
  @Input() type: string = 'text';      // Tipo de input (text, number, etc.)
  @Input() placeholder: string = '';   // Placeholder para el input
  @Input() value: string = '';         // Valor inicial del input
  @Input() required: boolean = false;  // Propiedad para marcar si es obligatorio
  @Input() minlength: number = 0;      // Longitud mínima
  @Input() maxlength: number = 255;    // Longitud máxima

  constructor() { }
}
