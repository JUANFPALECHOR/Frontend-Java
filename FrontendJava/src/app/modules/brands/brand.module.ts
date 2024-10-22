import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes para Brand
import { CreateBrandComponent } from './pages/create-brand.component';


// Definir las rutas específicas para este módulo
const routes: Routes = [
  { path: 'new', component: CreateBrandComponent },   // Ruta para crear una nueva marca       
];

@NgModule({
  declarations: [
    CreateBrandComponent,  // Componente para crear una nueva marca
  ],
  imports: [
    CommonModule,
    FormsModule,           // Para manejar formularios
    ReactiveFormsModule,    // Para manejar formularios reactivos
    RouterModule.forChild(routes)  // Configuración de las rutas específicas del módulo
  ]
})
export class BrandModule { }
