import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CreateCategoryComponent } from './pages/categories/create-category.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Ruta raíz
  { path: 'product/:id', component: ProductPageComponent }, // Ruta con parámetros dinámicos
  { path: '**', redirectTo: '' } // Ruta para manejar errores de navegación
  { path: 'categories/new', component: CreateCategoryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
