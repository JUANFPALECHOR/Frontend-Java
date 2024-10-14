import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from '../modules/categories/pages/create-category.component';

const routes: Routes = [
  { path: '', redirectTo: 'categories/new', pathMatch: 'full' },   // Redirigir la ruta raíz a Crear Categoría
  { 
    path: 'categories',  // Ruta principal para categorías
    loadChildren: () => import('../modules/categories/category.module').then(m => m.CategoryModule) 
  },
  { path: '**', redirectTo: 'categories/new' }   // Ruta comodín para redirigir rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Usa `forRoot` en el módulo principal
  exports: [RouterModule]
})
export class AppRoutingModule {}
