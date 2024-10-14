import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './pages/create-category.component';
import { AtomicModule } from '../atomic-design/atomic.module';
import { ReactiveFormsModule } from '@angular/forms';



// Definir las rutas para el módulo de categorías
const routes: Routes = [
  { path: 'new', component: CreateCategoryComponent }

];

@NgModule({
  declarations: [
    CreateCategoryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule.forChild(routes),  // Usar `forChild` para rutas de submódulos
    AtomicModule


  ],
  exports: [CreateCategoryComponent]
  
})
export class CategoryModule {}
