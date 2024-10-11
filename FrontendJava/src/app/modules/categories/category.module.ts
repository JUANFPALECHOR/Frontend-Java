import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './pages/create-category.component';
import { AtomicModule } from '../atomic-design/atomic.module';



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
    FormsModule,
    RouterModule.forChild(routes),  // Usar `forChild` para rutas de submódulos
    AtomicModule


  ],
  exports: [CreateCategoryComponent]
  
})
export class CategoryModule {}
