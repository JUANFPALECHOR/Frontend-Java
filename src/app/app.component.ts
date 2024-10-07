import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root', // Nombre del selector que se usará en el HTML (<app-root></app-root>)
  templateUrl: './app.component.html', // Ruta al archivo HTML del componente
  styleUrls: ['./app.component.css'],    // Ruta al archivo de estilos
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {
  title = 'E-commerce en Angular'; // Propiedad que puedes usar en el HTML para mostrar el título
}
