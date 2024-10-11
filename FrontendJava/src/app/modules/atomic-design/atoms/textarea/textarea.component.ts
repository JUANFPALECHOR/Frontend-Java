import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() rows: number = 3;         // Filas predeterminadas para el textarea
  @Input() cols: number = 20;        // Columnas predeterminadas
  @Input() required: boolean = false;
  @Input() maxlength: number = 255;

  constructor() { }
}
