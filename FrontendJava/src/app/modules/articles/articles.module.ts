import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './pages/create-article.component';
import { AtomicModule } from '../atomic-design/atomic.module';
import { ReactiveFormsModule } from '@angular/forms';

// Definir las rutas para el módulo de artículos
const routes: Routes = [
  { path: 'new', component: CreateArticleComponent }
];

@NgModule({
  declarations: [
    CreateArticleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule.forChild(routes), 
    AtomicModule
  ],
  exports: [CreateArticleComponent]
})
export class ArticlesModule {}
