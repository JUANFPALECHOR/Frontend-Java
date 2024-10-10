import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  category = {
    name: '',
    description: ''
  };

  constructor(private categoryService: CategoryService, private router: Router) {}

  onSubmit() {
    // Llama al servicio para crear la nueva categoría
    this.categoryService.createCategory(this.category).subscribe({
      next: (response) => {
        console.log('Categoría creada con éxito:', response);
        this.router.navigate(['/categories']); // Redirigir después de crear
      },
      error: (error) => {
        console.error('Error al crear la categoría:', error);
      }
    });
  }
}
