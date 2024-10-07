import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Lo vamos a crear en el siguiente paso

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule, // Módulo de rutas que definiremos más adelante
  ],
  providers: [],
  bootstrap: [], // Componente raíz que se inicializa al arrancar la app
})
export class AppModule {}
