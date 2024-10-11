import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { CategoryModule } from '../modules/categories/category.module';



//punto de entrada principal que configura cómo se estructura y organiza la aplicación Angular

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, // Módulo base para aplicaciones en navegadores
    AppRoutingModule, // Módulo con las rutas definidas
    RouterModule, // Módulo de rutas para manejar la navegación
    HttpClientModule,
    CategoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
