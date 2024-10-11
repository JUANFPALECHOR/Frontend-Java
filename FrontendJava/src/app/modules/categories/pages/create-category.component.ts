import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';  // Ajusta la ruta según la ubicación real

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',  // Asegúrate de que la ruta del HTML sea correcta
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  category = {
    name: '',
    description: ''
  };

  constructor(private readonly categoryService: CategoryService, private readonly router: Router) {}

  onSubmit() {
    console.log('Formulario enviado');
    this.categoryService.createCategory(this.category).subscribe({
      next: (response) => {
        console.log('Categoría creada con éxito:', response);
        this.router.navigate(['/categories']);
      },
      error: (error) => {
        console.error('Error al crear la categoría:', error);
      }
    });
  }
}
