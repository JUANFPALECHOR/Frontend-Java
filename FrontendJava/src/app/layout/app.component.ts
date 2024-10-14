import { Component } from '@angular/core';

//el archivo app.component.ts hace el mismo papel que el archivo JavaScript haría en una página HTML tradicional:

@Component({
  selector: 'app-root', //Define cómo se llama este componente cuando se usa en HTML.
  templateUrl: './app.component.html', // Usa este archivo HTML (app.component.html) para definir cómo se ve mi componente
  styleUrls: ['./app.component.css'] //igual aqui con las vistas 
})
export class AppComponent {
  title = 'FrontendJava'; // Propiedad que se usa en el HTML para mostrar el título
}
