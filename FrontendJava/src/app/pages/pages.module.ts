import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './categories/create-category.component';

@NgModule({
  declarations: [CreateCategoryComponent],
  imports: [
    CommonModule,
    FormsModule // Importar FormsModule para trabajar con formularios
  ],
  exports: [CreateCategoryComponent]
})
export class PagesModule {}
