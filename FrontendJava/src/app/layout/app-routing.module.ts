import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'categories/new', pathMatch: 'full' },   // Redirigir la ruta raíz a Crear Categoría
  { 
    path: 'categories',  // Ruta principal para categorías
    loadChildren: () => import('../modules/categories/category.module').then(m => m.CategoryModule) 
  },
  { 
    path: 'brands',  // Ruta principal para Brand
    loadChildren: () => import('../modules/brands/brand.module').then(m => m.BrandModule) 
  },
  {
    path: 'articles',  // Ruta principal para Brand
    loadChildren: () => import('../modules/articles/articles.module').then(m => m.ArticlesModule)
  },
  { path: '**', redirectTo: 'categoria/new' }   // Ruta comodín para redirigir rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Usa `forRoot` en el módulo principal
  exports: [RouterModule]
})
export class AppRoutingModule {}
