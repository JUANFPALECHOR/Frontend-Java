import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService, Category } from '../../../core/services/category.service';  // Ajusta la ruta según la ubicación real
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  categories: Category[] = [];  // Array de categorías basado en la interfaz
  currentPage: number = 1;
  currentOrder: 'asc' | 'desc' = 'asc';
  hasMoreCategories: boolean = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getCategories(this.currentPage, 10, this.currentOrder);
  }

  initializeForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]]
    });
  }

  onSubmit(): void {
    if (this.categoryForm?.valid) {
      console.log('Formulario enviado', this.categoryForm.value);
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: (response) => {
          console.log('Categoría creada con éxito:', response);
        },
        error: (error) => {
          console.error('Error al crear la categoría:', error);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para obtener categorías con paginación y ordenación
  getCategories(page: number, size: number, order: 'asc' | 'desc'): void {
    this.categoryService.getCategories(page, size, order).subscribe({
      next: (response) => {
        // Asignar las nuevas categorías
        this.categories = [...this.categories, ...response.content];
        this.hasMoreCategories = !response.last;  // Si no es la última página, se habilita el botón de "siguiente"
        console.log('Categorías obtenidas:', this.categories);
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    });
  }
  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log('Enter key pressed');
      // Aquí puedes añadir la acción que deseas realizar cuando se presiona "Enter"
    }
  }  
}


